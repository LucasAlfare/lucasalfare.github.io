interface ReferenceInfoItemDTO {
  referenceId: number;
  title: string;
  description: string;
  franchiseName: string;
  rawThumbnailData: Uint8Array;
}

const ReferenceInfoItem: React.FC<{ item: ReferenceInfoItemDTO }> = ({ item }) => {
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(item.rawThumbnailData))
  );

  return (
    <div className="max-w-80 min-h-96 rounded shadow-xl overflow-auto flex flex-col">
      <img src={`data:image/jpeg;base64,${base64String}`} className="border-double border-4 border-gray-600/2"></img>
      <div className="pb-2 h-full flex flex-col justify-between">
        <div className="px-6 py-4">
          <p className="font-bold text-xl mb-2">{item.title}</p>
          <p className="text-gray-500 text-base max-w-40">{item.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2 w-fit h-fit self-center">
          {/* <Button>Download</Button> // Material UI button*/}
          <button type='button' className="p-2 bg-blue-500 rounded shadow-2xl text-gray-200">Download</button>
        </div>
      </div>
    </div>
  );
}

const ReferencesList: React.FC<{ items: [ReferenceInfoItemDTO] }> = ({ items }) => {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
      {items.map(i => <ReferenceInfoItem key={i.referenceId} item={i}></ReferenceInfoItem>)}
    </div>
  );
}

export type { ReferenceInfoItemDTO as ReferenceInfoItemDTO };
export {
  ReferenceInfoItem,
  ReferencesList
}