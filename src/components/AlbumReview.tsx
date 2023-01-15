import Image from "next/image";
const AlbumReview = () => {
  return (
    <div className="flex py-4">
      <div className="mr-4 flex flex-col justify-around text-center">
        <Image
          src="https://randomuser.me/api/portraits/women/94.jpg"
          alt="user"
          height={50}
          width={50}
          className="rounded-full "
        />
        <div className="w-12">Like</div>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-slate-300">Username</p>
        <p
          className=" overflow-hidden text-ellipsis text-slate-400"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et
          suscipit mi. Pellentesque libero orci, volutpat sed diam ac, venenatis
          tempor enim. Curabitur vitae turpis non lorem vestibulum gravida vitae
          ut est. Ut dictum vitae ipsum eu finibus. Proin accumsan, augue vitae
          porttitor tincidunt, lorem augue tincidunt urna, a porttitor magna
          libero ut ipsum. In commodo sem quis dolor facilisis volutpat.
          Praesent sit amet diam ut velit fermentum eleifend cursus eget odio.
          Pellentesque pulvinar aliquet arcu, sit amet placerat nunc. Nulla non
          nisl vulputate, hendrerit leo id, feugiat leo. Donec massa nisi,
          sodales ut egestas nec, sagittis ac tortor. Cras luctus nulla eget
          lacus venenatis vulputate. Pellentesque a dapibus magna. Aliquam eget
          nibh vitae lectus mattis pharetra nec a mauris. Praesent hendrerit nec
          urna nec hendrerit. Nullam dolor nibh, blandit vitae magna ut, mollis
          euismod tellus. Nam iaculis ligula eu felis aliquam, vitae sodales
          sapien venenatis. Nunc sem leo, luctus quis ipsum vel, tincidunt
          sollicitudin erat. Pellentesque nunc metus, lacinia at venenatis quis,
          accumsan et orci. Nullam sodales interdum tellus sit amet hendrerit.
          Vestibulum bibendum ullamcorper risus ut semper. Morbi efficitur metus
          diam, eu dapibus tortor ullamcorper et. Suspendisse potenti.
          Pellentesque finibus vulputate purus, at mollis ante vulputate in.
          Nunc ut lacus nibh. Sed convallis, nisl in tincidunt dictum, sapien
          tellus pharetra dolor, eget ornare mi massa ut elit. Duis ac tellus
          quis arcu elementum dictum vel a enim. Vestibulum tempor arcu eu nibh
          tempor, eu accumsan turpis molestie. Donec urna tortor, efficitur id
          ligula eu, vulputate posuere velit. Maecenas eleifend, est vel
          ullamcorper dignissim, purus urna efficitur sem, vel egestas leo nisl
          quis nibh. Sed imperdiet sollicitudin ullamcorper. Duis nec vehicula
          erat. Morbi interdum ligula et lectus faucibus bibendum. Maecenas id
          volutpat eros. In hac habitasse platea dictumst. Quisque ut fermentum
          leo. Nulla facilisi. Donec elementum odio ornare pellentesque rhoncus.
          Curabitur euismod, ligula et porta tristique, nisi purus sagittis
          risus, sit amet interdum neque eros sit amet ex. Nam cursus sagittis
          faucibus. Duis venenatis tempor magna at sollicitudin. Fusce hendrerit
          felis sit amet sapien scelerisque tincidunt. Sed quis rutrum magna,
          non tempor odio. Fusce odio libero, lacinia sed orci eget, iaculis
          egestas libero. Morbi tincidunt eget mauris et dapibus. Curabitur
          purus massa, eleifend nec faucibus quis, tempus at turpis. Vivamus
          euismod augue ac libero dapibus, id laoreet lectus fringilla. Etiam
          dapibus eget metus in sodales. Praesent sagittis dignissim metus in
          rhoncus. Aenean ultrices nulla vel lacus commodo, sit amet porta orci
          ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Curabitur sagittis pellentesque
          pellentesque. Donec et eleifend tellus. Phasellus tristique imperdiet
          consectetur. Duis rutrum accumsan ultricies. Curabitur bibendum tempor
          feugiat. Nam porttitor massa augue, convallis iaculis sem aliquet non.
          Ut vestibulum, lectus vel luctus vulputate, magna ex condimentum odio,
          et rutrum odio est nec justo. Etiam ultrices vitae dolor nec mollis.
          Donec semper, diam a ornare hendrerit, mauris lacus mattis libero, in
          finibus nisi urna vitae massa. Nulla hendrerit est ut euismod
          tristique. Curabitur commodo porta sem, at tincidunt ligula varius a.
          Nullam facilisis.
        </p>
      </div>
    </div>
  );
};

export default AlbumReview;
