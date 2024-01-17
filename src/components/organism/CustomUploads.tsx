import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { supabaseGetPublicURL } from "@/lib/supabase";
import Image from "next/image";
import Icon from "./Icon";

interface CustomUploadsProps {
  form: any;
  name: string;
}

const CustomUploads: FC<CustomUploadsProps> = ({
  form,
  name,
}: CustomUploadsProps) => {
  const [previewImg, setPreviewImg] = useState<string>("");
  const inputRefs = useRef<HTMLInputElement>(null);

  const onFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      form.setValue(name, e.target.files[0]);
    }
  };

  useEffect(() => {
    async function getImage() {
      const { publicUrl } = await supabaseGetPublicURL(
        form.getValues(name),
        "company"
      );

      setPreviewImg(publicUrl);
    }

    if (form.getValues(name) !== "" && form.getValues(name) !== undefined) {
      getImage();
    }
  }, []);

  return (
    <>
      <div className="inline-flex items-center gap-8">
        <div>
          {previewImg !== "" ? (
            <Image width={120} height={120} src={previewImg} alt={previewImg} />
          ) : (
            <div
              className="w-24 h-24 bg-cover bg-no-repeat bg-center rounded-full"
              style={{
                background:
                  "url('https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=128&amp;h=160&amp;q=80')",
              }}
            ></div>
          )}
        </div>
        <div
          className="py-6 px-10 border-2 cursor-pointer border-dashed w-max rounded-sm"
          onClick={() => inputRefs.current?.click()}
        >
          <div className="w-6 h-6 mx-auto mb-5">
            <Icon name="upload-cloud"></Icon>
          </div>
          <div className="text-center">
            <span className="font-medium">Click to replace</span>{" "}
            <span className="text-gray-500">or drag and drop</span>
          </div>
          <div className="text-gray-600 text-sm text-center">
            PNG, JPG, JPEG (max. 400 x 400 px)
          </div>
          <input
            ref={inputRefs}
            type="file"
            className="hidden"
            accept="image/jpg, image/png, image/jpeg"
            onChange={onFileInput}
          />
        </div>
      </div>
    </>
  );
};

export default CustomUploads;
