const fs = require('fs');

function sanitizeWorkflow(inputFile, outputFile) {
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
    
    // Remove webhook IDs - DELETE THE PROPERTY ENTIRELY
    if (node.webhookId) {
      delete node.webhookId;
    }
    
    // Remove node IDs (optional but recommended)
    if (node.id) {
      node.id = `node-${node.name.replace(/\s+/g, '-').toLowerCase()}`;
    }
  });
  
  // Remove instance ID
  if (workflow.meta && workflow.meta.instanceId) {
    workflow.meta.instanceId = "[REDACTED]";
  }
  
  // Remove version ID
  if (workflow.versionId) {
    workflow.versionId = "[REDACTED]";
  }
  
  // Remove workflow ID
  if (workflow.id) {
    workflow.id = "[REDACTED]";
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(workflow, null, 2));
  console.log('✅ Workflow fully sanitized!');
  console.log(`📄 Output: ${outputFile}`);
}

// Auto-detect the input file
const possibleFiles = ['Gmail-triage1.json', 'Gmail-triage1.json'];
let inputFile = possibleFiles.find(f => fs.existsSync(f));

if (inputFile) {
  sanitizeWorkflow(inputFile, 'Gmail-triage1.json');
} else {
  console.error('❌ No workflow file found!');
}
