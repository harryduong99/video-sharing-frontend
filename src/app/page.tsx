"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Video } from "./components/items/Video";
import { Pagination } from "./components/paginations/Pagination";
import { useAuth } from "./contexts/auth";
import { useSocketContext } from "./contexts/socket";
import { defaultToastOptions } from "../utils/toast";
import { useFetchVideos } from "./hooks/useFetchVideos";


export default function Home() {
  const perPage = 3;
  const [page, setPage] = useState<number>(1);

  const {
    responseData,
    loading,
    get: requestVideos,
  } = useFetchVideos(page, perPage);

  const { socket } = useSocketContext();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      socket.disconnect();
      return;
    }
    socket.connect();
    socket.on("notify", (newNotification: any) => {
      if (newNotification.author != user.email) {
        toast.info(newNotification.body, defaultToastOptions);
      }
      requestVideos();
    });

    return () => {
      socket.off("notify");
    }
  }, []);

  useEffect(() => {
    requestVideos();
  }, [page]);

  return (
    <div className="mx-auto mt-8 lg:w-8/12 px-2 md:px-0 pb-10">
      {
        !loading && responseData?.data.map((video: any) => {
          return <Video key={video.id} video={video} />
        })
      }
      {responseData?.pagination.totalPages > 1 && (
        <Pagination
          onChangePage={setPage}
          totalPages={responseData?.pagination.totalPages}
          page={page}
          className="mt-8 justify-center"
        />
      )}
    </div>
  );
}
