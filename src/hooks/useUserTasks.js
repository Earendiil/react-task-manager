import { getUserTasks } from "@/api/userApi";
import { useEffect, useState } from "react";


const useUserTasks = (userId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;

      try {
        const data = await getUserTasks(userId);
        setTasks(data || []);
      } catch (error) {
        console.error("Error loading user tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  return { tasks, loading };
};

export default useUserTasks;
