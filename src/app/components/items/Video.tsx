import { clx } from "@/utils/helpers";

interface Props {
  video: any;
}

export const Video: React.FC<Props> = ({ video }) => {
  return (
    <div className="md:flex space-x-4 mt-6 w-full p-2 border border-primary-400 rounded-lg overflow-hidden bg-gray-100">
      <div className="md:w-[35%] ">
        <iframe
          height="100%"
          width="100%"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          data-testid="embed-iframe"
          className="video-frame"
        ></iframe>
      </div>
      <div className="md:w-[65%]">
        <div className="mt-4 md:mt-0 text-lg font-medium text-primary-600">
          {video.title}
        </div>
        <p>
          <span className="text-base-black">Shared by:</span>{" "}
          <b>{video.videoSharer.email}</b>
        </p>
        <p className="text-gray">
          <b>Desciption:</b> {video.description?.slice(0, 250)}...
        </p>
      </div>
    </div>
  );
};
