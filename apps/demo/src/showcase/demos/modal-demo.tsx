import { DemoSection } from "@/showcase/component-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
} from "@/components/ui/modal";

export default function ModalDemo() {
  return (
    <>
      <DemoSection
        title="Basic Modal"
        code={`import {
  Modal, ModalBody, ModalClose, ModalContent,
  ModalFooter, ModalHeader, ModalTrigger,
} from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader
      title="Edit Profile"
      description="Make changes to your profile here."
    />
    <ModalBody>
      <p>Modal body content goes here.</p>
    </ModalBody>
    <ModalFooter>
      <ModalClose asChild>
        <Button variant="outline">Cancel</Button>
      </ModalClose>
      <Button>Save Changes</Button>
    </ModalFooter>
  </ModalContent>
</Modal>`}
      >
        <Modal>
          <ModalTrigger asChild>
            <Button>Open Modal</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader
              title="Edit Profile"
              description="Make changes to your profile here."
            />
            <ModalBody>
              <p className="text-sm text-muted-foreground">
                This is a basic modal with a sticky header, scrollable body, and
                sticky footer. The default width is <code>sm:min-w-4xl</code>.
              </p>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button>Save Changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DemoSection>

      <DemoSection title="Modal with Form">
        <Modal>
          <ModalTrigger asChild>
            <Button>Add Employee</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader
              title="Add New Employee"
              description="Fill in the details below to add a new employee."
            />
            <ModalBody>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="modal-first-name">First Name</Label>
                    <Input id="modal-first-name" placeholder="John" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="modal-last-name">Last Name</Label>
                    <Input id="modal-last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="modal-email">Email</Label>
                  <Input
                    id="modal-email"
                    type="email"
                    placeholder="john@company.com"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="modal-department">Department</Label>
                  <Input id="modal-department" placeholder="Engineering" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="modal-position">Position</Label>
                  <Input id="modal-position" placeholder="Software Engineer" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button>Save Employee</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DemoSection>

      <DemoSection title="Scrollable Content">
        <Modal>
          <ModalTrigger asChild>
            <Button variant="outline">View Terms</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader title="Terms and Conditions" />
            <ModalBody>
              <div className="space-y-4 text-sm text-muted-foreground">
                {Array.from({ length: 12 }, (_, i) => (
                  <p key={i}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Decline</Button>
              </ModalClose>
              <Button>Accept</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DemoSection>

      <DemoSection title="No Close Button">
        <Modal>
          <ModalTrigger asChild>
            <Button variant="secondary">Open Modal</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader
              title="Confirmation Required"
              description="Please confirm your action below."
              showCloseButton={false}
            />
            <ModalBody>
              <p className="text-sm text-muted-foreground">
                This modal has no close button in the header. Users must use the
                footer buttons to dismiss it.
              </p>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DemoSection>
    </>
  );
}
