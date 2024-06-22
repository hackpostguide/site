'use client';
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
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const FormSchema = z.object({
  difficulty: z.array(z.string()),
  topics: z.array(z.string()),
});

export function TagManager({ postRef }: { postRef: any }) {
  const [initialTags, setInitialTags] = useState({ difficulty: [], topics: [] });

  useEffect(() => {
    const fetchInitialTags = async () => {
      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        const data: any = docSnap.data();
        setInitialTags({
          difficulty: data.difficulty || [],
          topics: data.topics || [],
        });
      }
    };
    fetchInitialTags();
  }, [postRef]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialTags,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateDoc(postRef, {
        difficulty: data.difficulty,
        topics: data.topics,
      });
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
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Tags</h4>
            <p className="text-sm text-muted-foreground">
              Add or remove tags.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="difficulty"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Difficulty</FormLabel>
                      <FormDescription>
                        Select the difficulty level.
                      </FormDescription>
                    </div>
                    {tags.difficulty.map((item) => (
                      <Controller
                        key={item.name}
                        name="difficulty"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(item.name)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, item.name]
                                    : field.value.filter((value) => value !== item.name);
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topics"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Topics</FormLabel>
                      <FormDescription>
                        Select the relevant topics.
                      </FormDescription>
                    </div>
                    {tags.topics.map((item) => (
                      <Controller
                        key={item.name}
                        name="topics"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(item.name)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, item.name]
                                    : field.value.filter((value) => value !== item.name);
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
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