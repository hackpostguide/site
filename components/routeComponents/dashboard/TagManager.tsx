import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { tags } from "@/app/config/tags";
import { getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const MAX_TAGS = 5;

const FormSchema = z.object({
  tags: z.array(z.string()).max(MAX_TAGS, `You can select up to ${MAX_TAGS} tags`),
});

export function TagManager({ postRef }: { postRef: any }) {
  const [initialTags, setInitialTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchInitialTags = async () => {
      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        const data: any = docSnap.data();
        setInitialTags(data.tags || []);
      }
    };
    fetchInitialTags();
  }, [postRef]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { tags: initialTags },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateDoc(postRef, { tags: data.tags });
      toast.success('Tags updated successfully');
    } catch (error) {
      console.error('Error updating tags:', error);
      toast.error('Failed to update tags');
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="mb-4">
          Set Tags
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        <h4 className="font-medium leading-none">Tags</h4>
                      </FormLabel>
                      <FormDescription>
                        <p className="text-sm text-muted-foreground">
                            Select up to {MAX_TAGS} tags.
                        </p>
                      </FormDescription>
                    </div>
                    <div className="max-h-60 overflow-y-auto pr-2">
                      {[...tags.difficulty, ...tags.topics].map((item) => (
                        <Controller
                          key={item.name}
                          name="tags"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value.includes(item.name)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...field.value, item.name]
                                      : field.value.filter((value) => value !== item.name);
                                    if (updatedValue.length <= MAX_TAGS) {
                                      field.onChange(updatedValue);
                                    } else {
                                      toast.error(`You can select up to ${MAX_TAGS} tags`);
                                    }
                                  }}
                                  disabled={!field.value.includes(item.name) && field.value.length >= MAX_TAGS}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update Tags</Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}