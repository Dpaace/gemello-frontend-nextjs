import Image from 'next/image';

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4">
      {/* First Section - Digital Twin Technology */}
      <div className="flex flex-col md:flex-row items-center w-full max-w-6xl">
        {/* Text Section */}
        <div className="md:w-1/2 flex flex-col justify-center md:pr-8">
          <h1 className="text-4xl md:text-6xl font-bold text-black">
            What is <span className="text-black">3D digital twin technology?</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Digital twins are an exceptional way of capturing and sharing spaces in immersive 3D and can move the needle across many industry use cases.
          </p>
        </div>

        {/* Image Section */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <Image
            src="/images/digital-twin.png"
            alt="3D Digital Twin Technology"
            width={300}
            height={400}
            objectFit="contain"
          />
        </div>
      </div>

      {/* How to create a digital twin Section */}
      <div className="mt-16 text-center w-full max-w-3xl">
        <h2 className="text-5xl font-bold text-black">How to create a digital twin:</h2>
        <p className="mt-4 text-lg text-gray-700">
          From cameras to capabilities, <br />
          discover everything you need to begin capturing, <br />
          editing, and sharing in 3D.
        </p>
      </div>

      {/* Capture Your Space Section */}
      <div className="mt-16 flex flex-col md:flex-row items-center w-full max-w-6xl">
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/capture-your-space.webp"
            alt="Capture Your Space"
            width={600}
            height={400}
            objectFit="contain"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center md:pl-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-black">Capture Your Space</h2>
          <p className="mt-4 text-lg text-gray-700">
            With advanced 3D cameras and software, capturing a space digitally is faster and easier than ever. Simply scan, upload, and start editing!
          </p>
        </div>
      </div>

      {/* Edit and Document Section */}
      <div className="mt-16 flex flex-col md:flex-row items-center w-full max-w-6xl">
        <div className="md:w-1/2 flex flex-col justify-center md:pr-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-black">Edit and Document</h2>
          <p className="mt-4 text-lg text-gray-700">
            Customize your digital twin to meet specific needs, from creating labels to adjusting viewpoints. Create a document that's useful and shareable.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/edit-document.jpg"
            alt="Edit and Document"
            width={500}
            height={300}
            objectFit="contain"
          />
        </div>
      </div>

      {/* Share and Collaborate Section */}
      <div className="mt-16 flex flex-col md:flex-row items-center w-full max-w-6xl">
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/images/digital-twin-room.jpg"
            alt="Share and Collaborate"
            width={500}
            height={300}
            objectFit="contain"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center md:pl-8 mt-8 md:mt-0">
          <h2 className="text-3xl font-bold text-black">Share and Collaborate</h2>
          <p className="mt-4 text-lg text-gray-700">
            Easily shareable across real estate and travel sites, digital twins are essential promotional tools. For operational use, digital twins improve efficiency and reduce travel needs for teams.
          </p>
        </div>
      </div>

      {/* New Section - Digital Twins Real-World Applications */}
      <div className="mt-16 text-center w-full max-w-6xl">
        <h2 className="text-4xl font-bold text-black">
          Digital twins. Real-world applications.
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          Digital twins are proving instrumental to different industries, from automotive and supply chain, pharmaceuticals, and green energy, to healthcare. Here are some examples:
        </p>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              image: "/images/real-estate.png",
              title: "Real Estate",
              description:
                "Matterport virtual tours are powerful marketing tools that help agents win listings and sell more properties faster and at a higher price.",
            },
            {
              image: "/images/travel-hospitality.png",
              title: "Travel & Hospitality",
              description:
                "A valuable addition to promotional materials, 3D tours boost bookings, drive higher occupancy rates, and increase online engagement.",
            },
            {
              image: "/images/architecture.png",
              title: "Architecture, Engineering, and Construction",
              description:
                "Digital twins streamline documentation and reduce costs with virtual collaboration in 3D scans of projects.",
            },
            {
              image: "/images/facilities-management.png",
              title: "Facilities Management",
              description:
                "Digital twins are an efficient, effective way to survey existing buildings, manage maintenance and develop remodeling plans.",
            },
            {
              image: "/images/insurance-restoration.png",
              title: "Insurance & Restoration",
              description:
                "Digital twins streamline the loss documentation process by enabling remote viewing and adjusting disputes in property claims.",
            },
            {
              image: "/images/public-spaces.png",
              title: "Public Spaces",
              description:
                "Digital twins allow 24/7 visitor access to museums and galleries and help event planners make informed design decisions.",
            },
          ].map((card, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <Image
                src={card.image}
                alt={card.title}
                width={100}
                height={100}
                objectFit="contain"
                className="mx-auto"
              />
              <h3 className="text-xl font-bold text-black mt-4">{card.title}</h3>
              <p className="mt-2 text-gray-700">{card.description}</p>
              <a href="#" className="text-blue-500 mt-4 block">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
