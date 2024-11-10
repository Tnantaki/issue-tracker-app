import { auth } from "@/auth";
import IssueForm from "../_components/IssueForm";
import { redirect } from "next/navigation";

const NewIssuePage = async () => {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }
  return <IssueForm />;
};

export default NewIssuePage