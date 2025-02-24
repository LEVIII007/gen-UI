import { auth, signIn } from "@/auth";

export default async function Login() {
  const session = await auth();
  if (session) {
    return (
      <div>
        <p>You are signed in.</p>
        <a href="/auth/logout">Sign out</a>
      </div>
    );
  }
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
