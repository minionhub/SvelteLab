import README from '../../../README.md?raw';
import type { DirectoryNode, FileSystemTree } from '@webcontainer/api';
import { marked } from 'marked';

const intro = marked(README.split('---')[0]);

const project = import.meta.glob('./**/!(package-lock.json)', {
	as: 'raw',
	eager: true
});

const project_files: FileSystemTree = {};

for (const file in project) {
	const path = file.split('/').slice(2);
	let subtree = project_files;
	for (let i = 0; i < path.length; i++) {
		const part = path[i];
		const is_directory = i !== path.length - 1;
		if (is_directory) {
			if (!subtree[part]) {
				subtree[part] = {
					directory: {}
				};
			}
			subtree = (subtree[part] as DirectoryNode).directory;
		} else {
			subtree[part] = {
				file: {
					contents: project[file].replace('%sveltekit.intro%', intro)
				}
			};
		}
	}
}

export const default_project_files = project_files satisfies FileSystemTree;
