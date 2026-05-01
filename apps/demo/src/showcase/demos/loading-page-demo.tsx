import { DemoSection } from "@/showcase/component-page";
import { LoadingPage } from "@/components/ui/loading-page";

export default function LoadingPageDemo() {
  return (
    <>
      <DemoSection
        title="Default"
        code={`<LoadingPage />`}
      >
        <div className="h-48">
          <LoadingPage />
        </div>
      </DemoSection>

      <DemoSection
        title="Custom message"
        code={`<LoadingPage message="Fetching your data..." />`}
      >
        <div className="h-48">
          <LoadingPage message="Fetching your data..." />
        </div>
      </DemoSection>

      <DemoSection
        title="With logo"
        code={`<LoadingPage
  logo={
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
      P
    </div>
  }
  message="Starting Pandahrms..."
/>`}
      >
        <div className="h-48">
          <LoadingPage
            logo={
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                P
              </div>
            }
            message="Starting Pandahrms..."
          />
        </div>
      </DemoSection>
    </>
  );
}
