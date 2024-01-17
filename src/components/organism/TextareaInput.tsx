import React, { FC, useEffect, useRef } from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface TextareaInputProps {
  form: any;
  name: string;
  label?: string;
  editorLoaded?: boolean;
}

const TextareaInput: FC<TextareaInputProps> = ({
  form,
  name,
  label,
  editorLoaded,
}: TextareaInputProps) => {
  const editorRef = useRef<any>();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);
  return (
    <>
      {editorLoaded ? (
        <div>
          <FormField
            control={form.control}
            name={name}
            render={() => (
              <FormItem>
                {label && <FormLabel>{label}</FormLabel>}
                <CKEditor
                  editor={ClassicEditor}
                  data={form.getValues(name)}
                  onChange={(event: any, editor: any) => {
                    const data = editor.getData();

                    form.setValue(name, data);
                  }}
                />
                <FormMessage className="mt-3"></FormMessage>
              </FormItem>
            )}
          ></FormField>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default TextareaInput;
