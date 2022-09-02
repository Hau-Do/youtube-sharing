import VideoAPI from 'api/actions/video';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useVideos = ({ lazy = false, params = {} }) => {
  const [videos, setVideos] = useState([]);
  const handleShareVideo = async (values) => {
    try {
      const response = await VideoAPI.share(values);
      toast.success(`Share video: ${response.video.title} successfully!`);
    } catch (error) {
      console.log('handleShareVideo,handleShareVideo', error);
    }
  };

  const fetchVideos = async (params) => {
    try {
      const response = await VideoAPI.list(params);
      setVideos(response.results);
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    if (!lazy) fetchVideos(params);
    // eslint-disable-next-line
  }, [params]);

  return { handleShareVideo, videos, fetchVideos };
};

export default useVideos;
