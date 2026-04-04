import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

const commaFormatter = (v: number) => new Intl.NumberFormat("en-MY").format(v);

export default function AnimatedNumberDemo() {
  const [count, setCount] = useState(42);
  const [percentage, setPercentage] = useState(75);
  const [price, setPrice] = useState(1250);
  const [decimal, setDecimal] = useState(3.14);
  const [big, setBig] = useState(98452);

  const randomize = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <>
      <DemoSection
        title="Basic counter"
        code={`const [count, setCount] = useState(42);

<AnimatedNumber value={count} className="text-4xl font-bold" />
<Button onClick={() => setCount(randomize(0, 100))}>Randomize</Button>`}
      >
        <div className="flex items-center gap-4">
          <AnimatedNumber value={count} className="text-4xl font-bold tabular-nums" />
          <Button onClick={() => setCount(randomize(0, 100))} size="sm">
            Randomize
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="With suffix"
        code={`<AnimatedNumber value={75} suffix="%" />`}
      >
        <div className="flex items-center gap-4">
          <AnimatedNumber
            value={percentage}
            suffix="%"
            className="text-3xl font-semibold tabular-nums"
          />
          <Button onClick={() => setPercentage(randomize(0, 100))} size="sm">
            Randomize
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="With prefix"
        code={`<AnimatedNumber value={1250} prefix="RM " />`}
      >
        <div className="flex items-center gap-4">
          <AnimatedNumber
            value={price}
            prefix="RM "
            className="text-3xl font-semibold tabular-nums"
          />
          <Button onClick={() => setPrice(randomize(100, 9999))} size="sm">
            Randomize
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="With decimals"
        code={`<AnimatedNumber value={3.14} decimals={2} />`}
      >
        <div className="flex items-center gap-4">
          <AnimatedNumber
            value={decimal}
            decimals={2}
            className="text-3xl font-semibold tabular-nums"
          />
          <Button
            onClick={() => setDecimal(Number((Math.random() * 10).toFixed(2)))}
            size="sm"
          >
            Randomize
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Custom formatter"
        code={`<AnimatedNumber
  value={98452}
  formatter={(v) => new Intl.NumberFormat("en-MY").format(v)}
/>`}
      >
        <div className="flex items-center gap-4">
          <AnimatedNumber
            value={big}
            formatter={commaFormatter}
            className="text-3xl font-semibold tabular-nums"
          />
          <Button onClick={() => setBig(randomize(10000, 999999))} size="sm">
            Randomize
          </Button>
        </div>
      </DemoSection>
    </>
  );
}
