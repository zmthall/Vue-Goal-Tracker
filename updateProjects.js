import fs from 'fs';
const filePath =
  '/Users/zmthall/Desktop/Programming/Web Development/Multicomponent Projects/Vue-Goal-Tracker/Projects.json';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  let projects = JSON.parse(data);

  projects.forEach((project) => {
    const projectId = project.id;
    project.tasks.forEach((task) => {
      task.projectId = projectId;
    });
  });

  fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf8', (err) => {
    if (err) throw err;
    console.log('File successfully updated!');
  });
});
