import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        const session = await signIn("google",{redirectTo:"/"});
      }}
    >
      <button type="submit">Sign in </button>
    </form>
  );
}
