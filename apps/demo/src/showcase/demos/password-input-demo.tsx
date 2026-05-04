import { useState } from 'react';

import { DemoSection } from '@/showcase/component-page';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';

export default function PasswordInputDemo() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <>
      <DemoSection
        title="Default"
        code={`import { PasswordInput } from "@/components/ui/password-input"

<PasswordInput placeholder="Enter password" />`}
      >
        <div className="max-w-sm">
          <PasswordInput placeholder="Enter password" />
        </div>
      </DemoSection>

      <DemoSection title="With Label">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="pw-labeled">Password</Label>
          <PasswordInput
            id="pw-labeled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>
      </DemoSection>

      <DemoSection title="Initially Visible">
        <div className="grid w-full max-w-sm gap-1.5">
          <Label htmlFor="pw-visible">One-time Password</Label>
          <PasswordInput id="pw-visible" defaultVisible defaultValue="hunter2-temp" />
        </div>
      </DemoSection>

      <DemoSection title="Confirm Password Pair">
        <div className="grid w-full max-w-sm gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="pw-new">New Password</Label>
            <PasswordInput
              id="pw-new"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="pw-confirm">Confirm Password</Label>
            <PasswordInput
              id="pw-confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Disabled">
        <div className="max-w-sm">
          <PasswordInput disabled defaultValue="locked-secret" />
        </div>
      </DemoSection>
    </>
  );
}
