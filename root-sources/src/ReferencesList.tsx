import { useState } from "react";

interface ReferenceInfoItemDTO {
  id: number;
  title: string;
  description: string;
  category: string;
  name: string;
  originalUrl: string;
  thumbnailUrl: string;
}

const ReferenceInfoItem: React.FC<{ item: ReferenceInfoItemDTO }> = ({ item }) => {
  const [waitingDownload, setWaitingDowload] = useState(false);

  const handleDownloadOriginal = () => {
    setWaitingDowload(true);
    fetch(item.originalUrl)
      .then(response => response.blob())
      .then(blob => {
        const urlBlob = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', item.name);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(urlBlob);
        setWaitingDowload(false);
      })
      .catch(error => console.error('Error downloading the file:', error));
  };

  if (waitingDownload) {
    return <span>"loading download..."</span>
  }

  return (
    <div className="hover:bg-slate-50 max-w-80 min-h-96 rounded shadow-xl overflow-auto flex flex-col">
      <img src={item.thumbnailUrl} className="border-double border-4 border-gray-600/2"></img>
      <div className="pb-2 h-full flex flex-col justify-between">
        <div className="px-6 py-4">
          <p className="font-bold text-xl mb-2">{item.title}</p>
          <p className="text-gray-500 text-base max-w-40">{item.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2 w-fit h-fit self-center">
          <button type='button' onClick={handleDownloadOriginal} className="p-2 rounded shadow-2xl text-gray-200 bg-blue-500 active:bg-blue-700 hover:bg-blue-600">Download</button>
        </div>
      </div>
    </div>
  );
}

const ReferencesList: React.FC<{ items: [ReferenceInfoItemDTO] }> = ({ items }) => {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
      {items.map(imageItem => <ReferenceInfoItem key={imageItem.id} item={imageItem}></ReferenceInfoItem>)}
    </div>
  );
}

export type { ReferenceInfoItemDTO as ReferenceInfoItemDTO };
export {
  ReferenceInfoItem,
  ReferencesList
}