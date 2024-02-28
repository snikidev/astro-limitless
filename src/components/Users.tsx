import { QueryClient, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { Link, User } from "@nextui-org/react";

export const USERS_QUERY_KEY = "users";

export const queryFn = async (): Promise<
  { login: string; id: number; avatar_url: string; html_url: string }[]
> => await ky.get("https://api.github.com/users").json();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export const Users = () => {
  const { data } = useQuery(
    { queryKey: [USERS_QUERY_KEY], queryFn },
    queryClient
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      {data?.map(({ login, id, avatar_url, html_url }) => (
        <User
          key={id}
          name={login}
          description={
            <Link href={html_url} size="sm" isExternal>
              Link
            </Link>
          }
          avatarProps={{
            src: avatar_url,
          }}
          className="flex justify-start"
        />
      ))}
    </div>
  );
};
