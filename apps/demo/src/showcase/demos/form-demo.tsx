import { DemoSection } from "@/showcase/component-page";

export default function FormDemo() {
  return (
    <div className="space-y-8">
      <DemoSection title="Overview" code={`import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"

const schema = z.object({
  email: z.string().email(),
})

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { email: "" },
})

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Enter your email address.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>`}>
        <div className="w-full max-w-sm space-y-4">
          <p className="text-sm text-muted-foreground">
            The Form component provides form field context, validation messages,
            and accessible labels built on react-hook-form. It exports: Form,
            FormField, FormItem, FormLabel, FormControl, FormDescription, and FormMessage.
          </p>
          <div className="rounded-lg border p-4 space-y-2">
            <p className="text-sm font-medium">Usage pattern:</p>
            <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
{`<Form {...form}>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>
          Enter your email address.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>`}
            </pre>
          </div>
        </div>
      </DemoSection>
    </div>
  );
}
