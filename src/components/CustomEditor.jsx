import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	BalloonToolbar,
	BlockQuote,
	BlockToolbar,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	FindAndReplace,
	FontColor,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HorizontalLine,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	Paragraph,
	RemoveFormat,
	SelectAll,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	TodoList,
	Underline,
	Undo,
    MediaEmbed,
    ImageInsert,
    Image,
	SimpleUploadAdapter
} from 'ckeditor5';
var IFRAME_SRC = 'https://cdn.iframe.ly/api/iframe';
 var API_KEY='fc86988db9e14b071f308a';
 var editorInstance
import 'ckeditor5/ckeditor5.css';

export function displayStatus( editor ){
	const pendingActions = editor.plugins.get('PendingActions');
	const statusIndicator = document.querySelector('#editor-status');

	pendingActions.on('change:hasAny', (evt, propertyName, newValue) => {
		if (newValue){
			statusIndicator.classList.add ('busy');
		}else {
			statusIndicator.classList.remove('busy');
		}
	});
}

import './App.css';
import Script from 'next/script';
import { saveContent } from '@/contexts/lib/user';
import { Button, Input, StepIndicatorContent, useToast } from '@chakra-ui/react';
import { auth } from '@/contexts/lib/firebase';
import TagsInput from './TagInput';

export default function CustomEditor() {

	
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [tags, setTags] = useState([]);
	const [title, setTitle] = useState("");
	const toast = useToast();


	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const handleTitleChange =(event) => {
		setTitle(event.target.value);
	};

	// const handleContentChange = (event) => {
	// 	StepIndicatorContent(event.editor.getData());
	// };

	const handleSave = async (event) => {
		event.preventDefault(); // Prevent the default form submission or button click behavior
		if (tags.length < 3) {
            toast({
                title: 'Error',
                description: 'Please add at least 3 tags before saving.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
		
		try {
			// Assuming you have a reference to the CKEditor instance
			const content = editorRef.current?.getData(); // Get the content from the CKEditor instance
	
			// Ensure content is actually a string
			if (typeof content !== 'string') {
				throw new Error('Content must be a string');
			}
	
			// Author ID should be the current user's ID
			const authorId = auth.currentUser?.uid;
	
			if (!authorId) {
				throw new Error('User is not authenticated');
			}
	
			await saveContent({ title, content, authorId, tags });
			console.log('Content saved successfully');
			toast({
				title: "Success",
				description: "post is successfully created",
				status: "success",
				duration: 3000,
				isClosable: true,
			  });
		} catch (error) {
			toast({
				title: "Duplicate",
				description: "Post already exists",
				status: "warning",
				duration: 3000,
				isClosable: true,
			  });
			console.error('Error saving content:', error);
		}
	};

	const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'findAndReplace',
				'selectAll',
				'|',
				'heading',
				'style',
				'|',
				'fontSize',
				'fontColor',
				'|',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'subscript',
				'superscript',
				'code',
				'removeFormat',
				'|',
				'specialCharacters',
				'horizontalLine',
				'link',
				'highlight',
				'blockQuote',
				'codeBlock',
				'|',
				'alignment',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'outdent',
				'indent',
				'|',
				'accessibilityHelp'
			],
			shouldNotGroupWhenFull: false,
			
		},
		plugins: [
			AccessibilityHelp,
			Alignment,
			Autoformat,
			AutoImage,
			AutoLink,
			Autosave,
			BalloonToolbar,
			BlockQuote,
			BlockToolbar,
			Bold,
			Code,
			CodeBlock,
			Essentials,
			FindAndReplace,
			FontColor,
			FontSize,
			GeneralHtmlSupport,
			Heading,
			Highlight,
			HorizontalLine,
			ImageBlock,
			ImageCaption,
			ImageInline,
			ImageInsertViaUrl,
			ImageResize,
			ImageStyle,
			ImageTextAlternative,
			ImageToolbar,
			ImageUpload,
            ImageInsert,
            Image,
			Indent,
			IndentBlock,
			Italic,
			Link,
			LinkImage,
			List,
            MediaEmbed,
			Paragraph,
			RemoveFormat,
			SelectAll,
			SimpleUploadAdapter
			,
			SpecialCharacters,
			SpecialCharactersArrows,
			SpecialCharactersCurrency,
			SpecialCharactersEssentials,
			SpecialCharactersLatin,
			SpecialCharactersMathematical,
			SpecialCharactersText,
			Strikethrough,
			Style,
			Subscript,
			Superscript,
			TodoList,
			Underline,
			Undo,
		],
		// autosave: {
		// 	waitingTime: 5000,
		// 	save(editor) {
		// 	return saveContent( editor.getData());
		// 	}
		// },
		simpleUpload: {
			uploadUrl: 'https://us-central1-chatter-bca44.cloudfunctions.net/uploadImage',
						withCredentials: true,
						// headers:{
							
						// }
						},
	
		mediaEmbed: {
			previewsInData: true,
			// providers: [
			// 	{
			// 		name: 'youtube',
			// 		url: [
			// 			/^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)(?:&t=(\d+))?/,
			// 			/^(?:m\.)?youtube\.com\/v\/([\w-]+)(?:\?t=(\d+))?/,
			// 			/^youtube\.com\/embed\/([\w-]+)(?:\?start=(\d+))?/,
			// 			/^youtu\.be\/([\w-]+)(?:\?t=(\d+))?/
			// 		],
			// 		html: match => {
			// 			const id = match[ 1 ];
			// 			const time = match[ 2 ];

			// 			return (
			// 				'<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
			// 					`<iframe src="https://www.youtube.com/embed/${ id }${ time ? `?start=${ time }` : '' }" ` +
			// 						'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
			// 						'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
			// 					'</iframe>' +
			// 				'</div>'
			// 			);
			// 	}
			// 	}
			// ]
// 			providers: [
// 				{
// 					name: "Generic URL",
//       url: /^.+/,  // Matches any URL
//       html: async (match) => {
//         const url = match[0];
//         const functionUrl = `https://us-central1-chatter-bca44.cloudfunctions.net/getMediaEmbed?url=${encodeURIComponent(url)}`;
// 		try {
// 			  const response = await fetch(functionUrl);
// 			  const data = await response.json();
// 			  return `<div class="iframely-embed">
//                     <div class="iframely-responsive">
//                       <iframe src="${data.html}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="border: 0;"></iframe>
//                     </div>
//                   </div>`;
// 		  } catch (error) {
// 			  console.error("Error fetching embed code:", error);
// 			  return '<p>Error Loading content</p>';
// 		  }
//       }
//     }
//   ]

		}
		,
		balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
		blockToolbar: ['fontSize', 'fontColor', '|', 'bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList', 'outdent', 'indent', '|', 'mediaEmbed', '|', 'insertImage', 'uploadImage'],
		fontSize: {
			options: [10, 12, 14, 'default', 18, 20, 22],
			supportAllValues: true
		},
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			]
		},
		
		image: {
			toolbar: [
				'toggleImageCaption',
				'imageTextAlternative',
				'|',
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText',
				'|',
				'resizeImage'
			]
		},
		initialData:
			'<h2>Chatter is in progress🎉</h2>\n<p>   We are still in the process of implementing the image upload functionality properly\n <p>Hi, my name is Ayo, and I think I`m too introverted for my own good.</p>\n \n<p>Being a part of the Tinyuka 2023 session is something I am grateful for, and although I am not able to properly complete it, I have learnt a lot and it was very stimulating</p>',
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
	
		style: {
			definitions: [
				{
					name: 'Article category',
					element: 'h3',
					classes: ['category']
				},
				{
					name: 'Title',
					element: 'h2',
					classes: ['document-title']
				},
				{
					name: 'Subtitle',
					element: 'h3',
					classes: ['document-subtitle']
				},
				{
					name: 'Info box',
					element: 'p',
					classes: ['info-box']
				},
				{
					name: 'Side quote',
					element: 'blockquote',
					classes: ['side-quote']
				},
				{
					name: 'Marker',
					element: 'span',
					classes: ['marker']
				},
				{
					name: 'Spoiler',
					element: 'span',
					classes: ['spoiler']
				},
				{
					name: 'Code (dark)',
					element: 'pre',
					classes: ['fancy-code', 'fancy-code-dark']
				},
				{
					name: 'Code (bright)',
					element: 'pre',
					classes: ['fancy-code', 'fancy-code-bright']
				}
			]
		}
	};

	return (
		<div>
			<div className="main-container">
				<div
					className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar"
					ref={editorContainerRef}
				>
					
					<div className="editor-container__editor">
						<div ref={editorRef}>{isLayoutReady && <><Input id='title'
						type='text'
						value={title}
						onChange={handleTitleChange}
						placeholder='Enter Title Here'/>  <CKEditor editor={ClassicEditor} config={editorConfig}

						onBlur={(e, editor) => {
						const data = editor.getData()
						}}
						onReady={(editor) => {editorRef.current = editor}} />
						   <TagsInput tags={tags} setTags={setTags} />

						<Button onClick={handleSave}>
							Save
						</Button>
						
						
						
						</>}</div>
						
					</div>
				</div>
			</div>
		</div>
	);
}