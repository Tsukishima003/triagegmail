const fs = require('fs');

// INPUT and OUTPUT are DIFFERENT files
const INPUT_FILE = 'Gmail-triage.json';   // Your real workflow
const OUTPUT_FILE = 'workflow-template.json';      // Sanitized version for GitHub

function sanitizeWorkflow(inputFile, outputFile) {
  console.log(`Reading from: ${inputFile}`);
  
  // Read the original file
  const workflow = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  
  // Remove credentials
  workflow.nodes.forEach(node => {
    if (node.credentials) {
      Object.keys(node.credentials).forEach(credType => {
        node.credentials[credType] = {
          id: "[CONFIGURE_YOUR_CREDENTIAL]",
          name: "Your credential name"
        };
      });
    }
    
    // Remove personal email
    if (node.parameters && node.parameters.sendTo) {
      node.parameters.sendTo = "your-email@example.com";
    }
    
    // Remove webhook IDs
    if (node.webhookId) {
      delete node.webhookId;
    }
  });
  
  // Remove sensitive IDs
  if (workflow.meta && workflow.meta.instanceId) {
    workflow.meta.instanceId = "[REDACTED]";
  }
  if (workflow.versionId) {
    workflow.versionId = "[REDACTED]";
  }
  if (workflow.id) {
    workflow.id = "[REDACTED]";
  }
  
  // Write to NEW file (doesn't touch the original!)
  fs.writeFileSync(outputFile, JSON.stringify(workflow, null, 2));
  
  console.log(`Sanitized version created: ${outputFile}`);
  console.log(`Original file untouched: ${inputFile}`);
  console.log('\n Remember: DO NOT commit the original file!');
}

// Check if input file exists
if (!fs.existsSync(INPUT_FILE)) {
  console.error(`Error: ${INPUT_FILE} not found!`);
  console.log('\nPlease export your workflow from n8n first.');
  console.log('In n8n: Menu → Download → Save as "Gmail-triage.json"');
} else {
  sanitizeWorkflow(INPUT_FILE, OUTPUT_FILE);
}
