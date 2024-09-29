import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffectButton = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="relative">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              {/* Conditionally render buttons below the description */}
              <div className="flex space-x-2 mt-4">
                {item?.buttons?.map((button, buttonIdx) => (
                  <Button
                    key={buttonIdx}
                    href={button.link}
                    value={button.value}
                  />
                ))}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-slate-100 dark:bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative ",
        className
      )}
    >
      <div className="relative">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const CardTitle = ({
  className,
  children
}) => {
  return (
    <h4 className={cn("text-black dark:text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

const CardDescription = ({
  className,
  children
}) => {
  return (
    <p className={cn("mt-8 text-zinc-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>
  );
};

const Button = ({ href, value, className }) => {
  return (
    <Link href={href}>
      <button
        className={cn(
          "text-sm py-1 px-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all",
          className
        )}
      >
        {value}
      </button>
    </Link>
  );
};
