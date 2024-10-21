import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Image } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { AiOutlineCloudUpload, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
// import classes from './DropzoneButton.module.css';

const RegisterForm = () => {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      // Create a preview URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  return (
    <div className={''}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={''}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif]} 
        maxSize={5 * 1024 ** 2} 
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <AiOutlineCheckCircle
                style={{ width: rem(50), height: rem(50), color: theme.colors.blue[6] }}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <AiOutlineCloseCircle
                style={{ width: rem(50), height: rem(50), color: theme.colors.red[6] }}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <AiOutlineCloudUpload style={{ width: rem(50), height: rem(50) }} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Image file less than 5MB</Dropzone.Reject>
            <Dropzone.Idle>Upload an image</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag’n’drop files here to upload. We can accept only <i>.png</i>, <i>.jpeg</i>, and <i>.gif</i> files that are less than 5MB in size.
          </Text>
        </div>
      </Dropzone>

      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          radius="md"
          mt="md"
          withPlaceholder
          width={200}
          height={200}
        />
      )}

      <Button className={''} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}

export default RegisterForm;