import { useAccessToken, useRefreshToken } from "@/store";

export default function AccessTestPage() {
  const token = useAccessToken();
  const refresh = useRefreshToken();
  return (
    <div>
      <h1>Access Token : {token}</h1>
      <h1>Refresh Token : {refresh}</h1>
    </div>
  );
}
