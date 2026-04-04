import { useState } from "react";
import { DemoSection } from "@/showcase/component-page";
import {
  AttachmentInput,
  type AttachmentFile,
} from "@/components/ui/attachment-input";

export default function AttachmentInputDemo() {
  const [singleFile, setSingleFile] = useState<AttachmentFile | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<AttachmentFile[]>([]);
  const [compactSingle, setCompactSingle] = useState<AttachmentFile | null>(
    null
  );
  const [compactMultiple, setCompactMultiple] = useState<AttachmentFile[]>([]);
  const [limitedFiles, setLimitedFiles] = useState<AttachmentFile[]>([]);
  const [existingFiles, setExistingFiles] = useState<AttachmentFile[]>([
    {
      id: "1",
      name: "quarterly-report.pdf",
      size: 2_400_000,
      type: "application/pdf",
      url: "#",
    },
    {
      id: "2",
      name: "team-photo.jpg",
      size: 1_100_000,
      type: "image/jpeg",
      url: "#",
    },
  ]);

  return (
    <>
      <DemoSection title="Single File (Dropzone)" code={`import { useState } from "react"
import { AttachmentInput, type AttachmentFile } from "@/components/ui/attachment-input"

const [file, setFile] = useState<AttachmentFile | null>(null)

<AttachmentInput
  mode="single"
  value={file}
  onChange={setFile}
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
/>`}>
        <div className="grid w-full max-w-md gap-1.5">
          <p className="text-sm text-muted-foreground">
            Select a single file. Choosing a new file replaces the current one.
          </p>
          <AttachmentInput
            mode="single"
            value={singleFile}
            onChange={setSingleFile}
            accept="image/*,.pdf"
            maxSize={10 * 1024 * 1024}
          />
        </div>
      </DemoSection>

      <DemoSection title="Multiple Files (Dropzone)">
        <div className="grid w-full max-w-md gap-1.5">
          <p className="text-sm text-muted-foreground">
            Select multiple files. Duplicates are automatically skipped.
          </p>
          <AttachmentInput
            mode="multiple"
            value={multipleFiles}
            onChange={setMultipleFiles}
            accept="image/*,.pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024}
          />
        </div>
      </DemoSection>

      <DemoSection title="Single File (Compact)">
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            A compact attachment input that looks like a form field.
          </p>
          <AttachmentInput
            mode="single"
            variant="compact"
            value={compactSingle}
            onChange={setCompactSingle}
            accept="image/*,.pdf"
          />
        </div>
      </DemoSection>

      <DemoSection title="Multiple Files (Compact)">
        <div className="grid w-full max-w-sm gap-1.5">
          <p className="text-sm text-muted-foreground">
            Compact variant with multiple file selection. Files shown as chips.
          </p>
          <AttachmentInput
            mode="multiple"
            variant="compact"
            value={compactMultiple}
            onChange={setCompactMultiple}
          />
        </div>
      </DemoSection>

      <DemoSection title="With Max Files Limit">
        <div className="grid w-full max-w-md gap-1.5">
          <p className="text-sm text-muted-foreground">
            Limited to 3 files. The dropzone disables when the limit is reached.
          </p>
          <AttachmentInput
            mode="multiple"
            value={limitedFiles}
            onChange={setLimitedFiles}
            maxFiles={3}
            maxSize={5 * 1024 * 1024}
          />
        </div>
      </DemoSection>

      <DemoSection title="Pre-populated (Edit Form)">
        <div className="grid w-full max-w-md gap-1.5">
          <p className="text-sm text-muted-foreground">
            Existing attachments from a saved record. New files can be added
            alongside them.
          </p>
          <AttachmentInput
            mode="multiple"
            value={existingFiles}
            onChange={setExistingFiles}
            accept="image/*,.pdf"
            maxFiles={5}
          />
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="grid w-full max-w-md gap-1.5">
          <p className="text-sm text-muted-foreground">
            A disabled attachment input that cannot be interacted with.
          </p>
          <AttachmentInput
            mode="single"
            value={{
              name: "locked-document.pdf",
              size: 3_200_000,
              type: "application/pdf",
            }}
            onChange={() => {}}
            disabled
          />
        </div>
      </DemoSection>
    </>
  );
}
