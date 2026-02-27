import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useDemoModal } from "./demo-modal-context";

export function DemoModal() {
  const { isOpen, closeDemoModal } = useDemoModal();
  const rm = useReducedMotion();
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [emailWarning, setEmailWarning] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setEmail("");
      setEmailWarning("");
    }
  }, [isOpen]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val.toLowerCase().endsWith("@gmail.com") || val.toLowerCase().endsWith("@outlook.com") || val.toLowerCase().endsWith("@yahoo.com")) {
      setEmailWarning("Please use your work email for faster processing.");
    } else {
      setEmailWarning("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      closeDemoModal();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDemoModal}
            className="absolute inset-0 bg-slate-900/35 backdrop-blur-[6px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-[440px] bg-white rounded-[32px] shadow-[0_28px_90px_rgba(2,6,23,0.18)] overflow-hidden border border-slate-200/70"
          >
            <div className="p-6 sm:p-10">
              <button
                onClick={closeDemoModal}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600"
              >
                <Icon icon="lucide:x" width={20} height={20} />
              </button>

              <div className="text-center mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-slate-500 mb-2">
                  Connect with ScribeUp
                </p>
                <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.04em] text-slate-900 mb-2 leading-[1.15]">
                  Book a Demo
                </h3>
                <p className="text-sm text-slate-500">
                  Spend 30 minutes with the ScribeUp team and get tailored recommendations for your subscription strategy.
                </p>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput label="First Name" id="first-name" required delay={0.1} />
                    <FloatingInput label="Last Name" id="last-name" required delay={0.15} />
                  </div>

                  {/* Company */}
                  <FloatingInput 
                    label="Company" 
                    id="company" 
                    required 
                    delay={0.2}
                    icon="lucide:building-2"
                  />

                  {/* Work Email */}
                  <div className="relative">
                    <FloatingInput 
                      label="Work Email" 
                      id="email" 
                      type="email" 
                      required 
                      delay={0.25}
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <AnimatePresence>
                      {emailWarning && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute left-0 -bottom-5 text-[10px] text-amber-600 font-medium"
                        >
                          {emailWarning}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message */}
                  <FloatingTextarea 
                    label="How can we help?" 
                    id="message" 
                    delay={0.3}
                  />

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      type="submit"
                      className="group relative w-full h-[46px] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] rounded-[16px] font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_10px_30px_rgba(2,6,23,0.06)] overflow-hidden border border-blue-600/15"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        Submit
                        <Icon icon="lucide:arrow-right" width={18} height={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        animate={rm ? { opacity: 0 } : { x: ["-100%", "200%"] }}
                        transition={rm ? { duration: 0.2 } : { duration: 3, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] opacity-60"
                      />
                      
                      {/* Inner Top Edge Glow */}
                      <div className="absolute inset-x-0 top-0 h-px bg-white/55 shadow-[0_1px_4px_rgba(255,255,255,0.35)]" />
                    </button>
                  </motion.div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_8px_24px_rgba(16,185,129,0.3)]">
                    <Icon icon="lucide:check" width={32} height={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent</h4>
                  <p className="text-slate-500 text-center">We'll be in touch with you shortly.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FloatingInput({ 
  label, 
  id, 
  type = "text", 
  required = false, 
  delay = 0, 
  icon,
  value,
  onChange 
}: { 
  label: string; 
  id: string; 
  type?: string; 
  required?: boolean; 
  delay?: number;
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const actualValue = value !== undefined ? value : internalValue;
  const isFilled = actualValue.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative"
    >
      <div className="flex items-center">
        {icon && (
          <Icon 
            icon={icon} 
            className={`absolute left-0 transition-colors ${focused ? 'text-blue-500' : 'text-slate-400'}`} 
            width={16} 
          />
        )}
        <input
          id={id}
          type={type}
          required={required}
          value={actualValue}
          onChange={(e) => {
            if (onChange) onChange(e);
            else setInternalValue(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent border-b border-slate-200 py-3 ${icon ? 'pl-6' : ''} text-sm font-medium focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors peer appearance-none rounded-none shadow-none`}
          placeholder=" "
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className={`absolute ${icon ? 'left-6' : 'left-0'} top-3 text-sm text-slate-400 transition-all pointer-events-none ${
            focused || isFilled ? "-translate-y-5 scale-[0.85] text-blue-500 font-semibold" : ""
          }`}
        >
          {label}
        </label>
        
        {/* Inline Validation Checkmark */}
        <AnimatePresence>
          {isFilled && !focused && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-0 top-3 text-emerald-500"
            >
              <Icon icon="lucide:check-circle-2" width={16} height={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function FloatingTextarea({ 
  label, 
  id, 
  required = false, 
  delay = 0 
}: { 
  label: string; 
  id: string; 
  required?: boolean; 
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isFilled = value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative pt-2"
    >
      <textarea
        id={id}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b border-slate-200 py-2 text-sm font-medium focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors resize-none h-[40px] peer overflow-hidden appearance-none rounded-none shadow-none"
        placeholder=" "
        rows={1}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 top-4 text-sm text-slate-400 transition-all pointer-events-none ${
          focused || isFilled ? "-translate-y-6 scale-[0.85] text-blue-500 font-semibold" : ""
        }`}
      >
        {label}
      </label>
    </motion.div>
  );
}

