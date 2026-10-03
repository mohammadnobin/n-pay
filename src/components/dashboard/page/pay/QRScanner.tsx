"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/hooks/useLang";
import { Camera, CameraOff } from "lucide-react";
import jsQR from "jsqr";
import { Button } from "@/components/ui/button";
export function QRScanner({ onDecode }: { onDecode: (value: string) => void }) {
  const { t } = useLang();
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const callback = useRef(onDecode);
  useEffect(() => {
    callback.current = onDecode;
  }, [onDecode]);
  useEffect(() => {
    if (!active) return;
    let stopped = false;
    let stream: MediaStream | undefined;
    let frame = 0;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    async function start() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("camera");
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 960 },
          },
          audio: false,
        });
        if (stopped) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (video.current) {
          video.current.srcObject = stream;
          await video.current.play();
        }
        function scan() {
          if (stopped) return;
          const v = video.current;
          if (v && v.readyState >= 2 && ctx) {
            canvas.width = v.videoWidth;
            canvas.height = v.videoHeight;
            ctx.drawImage(v, 0, 0);
            const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(pixels.data, canvas.width, canvas.height, {
              inversionAttempts: "dontInvert",
            });
            if (code) {
              callback.current(code.data);
              setActive(false);
              return;
            }
          }
          frame = requestAnimationFrame(scan);
        }
        scan();
      } catch {
        stream?.getTracks().forEach((t) => t.stop());
        if (!stopped) {
          setError(true);
          setActive(false);
        }
      }
    }
    void start();
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [active]);
  return (
    <div className="space-y-3">
      {active && (
        <video
          ref={video}
          muted
          playsInline
          aria-label={t("scanCamera")}
          className="aspect-video w-full rounded-xl bg-black object-cover"
        />
      )}
      <Button
        variant="outline"
        type="button"
        className="w-full rounded-full"
        onClick={() => {
          setError(false);
          setActive(!active);
        }}
      >
        {active ? <CameraOff size={18} /> : <Camera size={18} />}{" "}
        {t(active ? "stopCamera" : "scanCamera")}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-warning">
          {t("cameraError")}
        </p>
      )}
    </div>
  );
}
