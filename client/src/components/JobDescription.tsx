import { FileText } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface JobDescriptionProps {
  onJobDescriptionChange: (description: string) => void;
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  onJobDescriptionChange,
}) => {
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = event.target.value;
    onJobDescriptionChange(description);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <FileText />
        <h3 className="text-lg font-semibold">Job Description</h3>
      </div>
      <Textarea
        onChange={handleDescriptionChange}
        placeholder="Paste the job description here..."
        className="w-full h-40 p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default JobDescription;
