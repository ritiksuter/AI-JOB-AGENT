import { useState } from "react";

import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

const ProfileForm = ({
  profile,
  loading = false,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(() => ({
    name: profile?.name ?? "",
    jobRole: profile?.jobRole ?? "",
    location: profile?.location ?? "",
    experience: profile?.experience ?? "",
    cronExpression: profile?.cronExpression ?? "",
    remoteOnly: profile?.remoteOnly ?? false,
  }));

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card
      title="Profile"
      subtitle="Manage your job search preferences."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <Input
          label="Preferred Job Role"
          name="jobRole"
          value={formData.jobRole}
          onChange={handleChange}
          placeholder="Backend Developer"
        />

        <Input
          label="Preferred Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Remote / Bengaluru"
        />

        <Input
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Fresher"
        />

        <Input
          label="Cron Schedule"
          name="cronExpression"
          value={formData.cronExpression}
          onChange={handleChange}
          placeholder="0 9 * * *"
        />

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
          <input
            id="remoteOnly"
            type="checkbox"
            name="remoteOnly"
            checked={formData.remoteOnly}
            onChange={handleChange}
            className="h-5 w-5 cursor-pointer accent-blue-600"
          />

          <label
            htmlFor="remoteOnly"
            className="cursor-pointer text-sm font-medium text-gray-700"
          >
            Search Remote Jobs Only
          </label>
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
        >
          Save Changes
        </Button>
      </form>
    </Card>
  );
};

export default ProfileForm;