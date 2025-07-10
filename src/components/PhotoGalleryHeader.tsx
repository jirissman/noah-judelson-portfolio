interface PhotoGalleryHeaderProps {
  title: string;
  description: string;
}

export default function PhotoGalleryHeader({ title, description }: PhotoGalleryHeaderProps) {
  return (
    <div className="relative w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
