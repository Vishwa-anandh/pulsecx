"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useUsers } from "../context/UserContext";

export function OnboardingModal() {
  const { currentUser, setCurrentUser } = useUsers();
  const [step, setStep] = useState(1);

  // Derive isOpen directly from the user's state. 
  // We only show it if the user just created their account (isNewUser)
  const isOpen = Boolean(currentUser?.isNewUser);
  console.log("OnboardingModal rendered. currentUser:", currentUser, "isOpen:", isOpen);

  const stepContent = [
    {
      title: "Welcome to PulseCX",
      description:
        "Your centralized command center for monitoring customer experience and resolving incidents faster.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=200",
    },
    {
      title: "Connect Integrations",
      description:
        "Easily connect your APM, log management, and cloud infrastructure to get unified visibility.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400&h=200",
    },
    {
      title: "Configure Alerts",
      description: "Set up intelligent routing to notify the right teams exactly when anomalies occur.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400&h=200",
    },
    {
      title: "Ready to Start?",
      description:
        "Jump into the dashboard and explore your observability data in real-time.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=200",
    },
  ];

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const closeAndComplete = () => {
    // Remove the isNewUser flag from the current user
    if (currentUser) {
      setCurrentUser({ ...currentUser, isNewUser: false });
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeAndComplete();
        } else {
          setStep(1);
        }
      }}
    >
      <DialogContent className="gap-0 p-0 overflow-hidden bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-color)]">
        <div className="p-2">
          <img
            className="w-full rounded-lg object-cover"
            src={stepContent[step - 1].image}
            width={382}
            height={216}
            alt="dialog"
            style={{ height: '216px' }}
          />
        </div>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription className="text-[var(--text-muted)]">{stepContent[step - 1].description}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]",
                    index + 1 === step ? "opacity-100" : "opacity-20",
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeAndComplete} className="text-[var(--text-muted)]">
                Skip
              </Button>
              {step < totalSteps ? (
                <Button className="group bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]" type="button" onClick={handleContinue}>
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <Button type="button" onClick={closeAndComplete} className="bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)]">Okay</Button>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
