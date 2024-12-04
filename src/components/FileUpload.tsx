import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  onCancel: () => void;
  onConfirm: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  files: existingFiles,
  onCancel,
  onConfirm,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedFiles);
    setSelectedFiles([]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">资料上传</h2>
        <div className="space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-1 text-sm border rounded hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            确认
          </button>
        </div>
      </div>

      {existingFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">已上传的文件：</h3>
          <div className="space-y-2">
            {existingFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="material-icons">description</span>
                {file.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">新选择的文件：</h3>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="material-icons">description</span>
                {file.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-2">
          上传对象社交媒体平台、个人网站、照片、聊天记录等
        </p>
        <p className="text-sm text-gray-500">
          格式支持url/word/pdf/png
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          multiple
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          点击上传
        </button>
      </div>
    </div>
  );
};