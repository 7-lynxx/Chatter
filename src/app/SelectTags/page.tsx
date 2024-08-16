'use client'
import { useState } from "react";
import { Box, Button, Checkbox, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { saveUserTags } from "@/contexts/lib/user";

const availableTags: string[] = [
  "JavaScript",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Web Development",
  "Programming",
  "Python",
  "Data Science",
  "AI",
];

const TagSelection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSaveTags = async () => {
    if (selectedTags.length < 3) {
      alert("Please select at least 3 tags.");
      return;
    }

    try {
      await saveUserTags(selectedTags);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save tags", error);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={4}>Select Your Interests</Heading>
      <VStack align="start" spacing={4}>
        {availableTags.map((tag, index) => (
          <Checkbox
            key={index} // Ensure the key is unique
            isChecked={selectedTags.includes(tag)}
            onChange={() => handleTagChange(tag)}
          >
            {tag}
          </Checkbox>
        ))}
      </VStack>
      <Button mt={8} colorScheme="blue" onClick={handleSaveTags}>
        Save Tags
      </Button>
    </Box>
  );
};

export default TagSelection;