import React, { useState } from 'react';
import { Input, Button, Box, Tag, TagLabel, TagCloseButton, Text, useToast } from '@chakra-ui/react';

interface TagsInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');
    const toast = useToast();

    const handleAddTag = () => {
        const trimmedValue = inputValue.trim();

        if (trimmedValue && !tags.includes(trimmedValue) && tags.length < 10) {
            setTags([...tags, trimmedValue]);
            setInputValue('');
        } else if (tags.includes(trimmedValue)) {
            toast({
                title: 'Duplicate Tag',
                description: 'This tag has already been added.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        } else if (tags.length >= 10) {
            toast({
                title: 'Limit Reached',
                description: 'You can only add up to 10 tags.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <Box>
            <Text mb={1} color="gray.600">
                Add at least 3 tags to categorize your post. Press `Enter` after typing each tag.
            </Text>
            <Box display="flex" alignItems="center" mb={2}>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type a tag and press Enter"
                    size="sm"
                    mr={2}
                />
                <Button onClick={handleAddTag} size="sm">
                    Add Tag
                </Button>
            </Box>
            <Box>
                {tags.map((tag) => (
                    <Tag
                        size="sm"
                        key={tag}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="teal"
                        m={1}
                    >
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                ))}
            </Box>
            {tags.length < 3 && (
                <Text mt={2} color="red.500">
                    Please add at least {3 - tags.length} more tag{tags.length === 2 ? '' : 's'}.
                </Text>
            )}
        </Box>
    );
};

export default TagsInput;