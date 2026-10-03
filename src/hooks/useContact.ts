"use client";
import { useMutation } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";

export const useSendContactMessage = () =>
  useMutation({ mutationFn: contactService.send });
