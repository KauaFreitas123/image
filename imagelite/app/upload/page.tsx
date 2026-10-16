
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button, Input, Template } from '@/components';
import { useImageService } from '@/resource/service';

export default function UploadPage() {
  const imageService = useImageService();
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<string | null>(null);

  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [tagsText, setTagsText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }
    };
  }, []);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event.currentTarget.files?.[0] ?? null;

    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }

    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      previewRef.current = url;
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const imageName = name.trim();
    const tags = tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!imageName) {
      setError('Informe o nome da imagem.');
      return;
    }

    if (!file) {
      setError('Selecione um arquivo de imagem.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 20 MB.');
      return;
    }

    if (tags.length === 0) {
      setError('Informe pelo menos uma tag.');
      return;
    }

    setIsLoading(true);

    try {
      await imageService.enviar(file, imageName, tags);

      setSuccess(true);
      setName('');
      setFile(null);
      setTagsText('');

      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }

      setPreview(null);
      formRef.current?.reset();
    } catch (cause) {
      console.error('Erro ao enviar imagem:', cause);

      setError(
        cause instanceof Error
          ? cause.message
          : 'Não foi possível enviar a imagem.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Template>
      <main className="mx-auto max-w-xl p-4 text-white">
        <h1 className="mb-6 text-2xl font-bold tracking-tight">
          Enviar imagem <span className="text-cyan-400">.</span>
        </h1>

        <form
          ref={formRef}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="Nome da imagem"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="image-file"
              className="text-sm font-medium text-slate-200"
            >
              Arquivo da imagem
              <span className="ml-1 text-cyan-400">*</span>
            </label>

            <input
              id="image-file"
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              className="peer sr-only"
              onChange={handleFileChange}
              required={!file}
            />

            <label
              htmlFor="image-file"
              className="group flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-400/30 bg-slate-900/80 p-5 text-center shadow-lg shadow-black/10 transition duration-300 hover:border-cyan-400/70 hover:bg-slate-900 hover:shadow-cyan-500/5 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950"
            >
              {preview ? (
                <div className="mb-4 w-full overflow-hidden rounded-xl border border-cyan-400/20 bg-slate-950 p-2">
                  <img
                    src={preview}
                    alt="Pré-visualização da imagem selecionada"
                    className="mx-auto max-h-64 max-w-full rounded-lg object-contain"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-400/15">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="m17 8-5-5-5 5" />
                    <path d="M12 3v12" />
                  </svg>
                </div>
              )}

              <span className="max-w-full break-all font-semibold text-slate-100">
                {file ? file.name : 'Escolha sua imagem'}
              </span>

              <span className="mt-2 text-sm text-slate-400">
                {file
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                  : 'PNG, JPG, JPEG ou GIF'}
              </span>

              <span className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition group-hover:border-cyan-400/60 group-hover:bg-cyan-400/20">
                {file ? 'Trocar imagem' : 'Selecionar arquivo'}
              </span>

              {!file && (
                <span className="mt-3 text-xs text-slate-500">
                  Tamanho máximo: 20 MB
                </span>
              )}
            </label>
          </div>

          <Input
            label="Tags separadas por vírgula"
            value={tagsText}
            onChange={(event) => setTagsText(event.target.value)}
            placeholder="natureza, viagem"
            required
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar imagem'}
          </Button>
        </form>

        {error && (
          <p
            className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
            role="alert"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            className="mt-4 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-3 text-sm text-cyan-300"
            role="status"
          >
            Imagem enviada com sucesso!
          </p>
        )}

        <Link
          className="mt-5 inline-block text-sm text-slate-400 transition hover:text-cyan-400"
          href="/galeria"
        >
          ← Voltar para a galeria
        </Link>
      </main>
    </Template>
  );
}
