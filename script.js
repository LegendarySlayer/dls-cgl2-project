 let inspectionData = {
            coilId: '',
            topDefects: [
                {name: 'Scratch', startLength: 450, endLength: 500, startWidth: 100, endWidth: 200, severity: 4},
                {name: 'Defect 1', startLength: 950, endLength: 1000, startWidth: 700, endWidth: 800, severity: 4}
            ],
            bottomDefects: [
                {name: 'Scratch', startLength: 450, endLength: 500, startWidth: 100, endWidth: 200, severity: 4},
                {name: 'Defect 1', startLength: 950, endLength: 1000, startWidth: 700, endWidth: 800, severity: 4}
            ],
            remarks: 'Coil inspection will be entered by the operator. He may enter the lengthy text.',
            status: '',
            holdDescription: 'Reason for putting the coil on hold status'
        };

        // Add top defect
        function addTopDefect() {
            const defectName = document.getElementById('topDefectName').value;
            const startLength = document.getElementById('topStartLength').value;
            const endLength = document.getElementById('topEndLength').value;
            const startWidth = document.getElementById('topStartWidth').value;
            const endWidth = document.getElementById('topEndWidth').value;
            const severity = document.getElementById('topSeverity').value;

            if (!defectName || !startLength || !endLength || !startWidth || !endWidth || !severity) {
                alert('Please fill all fields');
                return;
            }

            const defect = {
                name: defectName,
                startLength: parseInt(startLength),
                endLength: parseInt(endLength),
                startWidth: parseInt(startWidth),
                endWidth: parseInt(endWidth),
                severity: parseInt(severity)
            };

            inspectionData.topDefects.push(defect);
            updateTopDefectTable();
            clearTopForm();
            alert('Top defect added successfully!');
        }

        // Add bottom defect
        function addBottomDefect() {
            const defectName = document.getElementById('bottomDefectName').value;
            const startLength = document.getElementById('bottomStartLength').value;
            const endLength = document.getElementById('bottomEndLength').value;
            const startWidth = document.getElementById('bottomStartWidth').value;
            const endWidth = document.getElementById('bottomEndWidth').value;
            const severity = document.getElementById('bottomSeverity').value;

            if (!defectName || !startLength || !endLength || !startWidth || !endWidth || !severity) {
                alert('Please fill all fields');
                return;
            }

            const defect = {
                name: defectName,
                startLength: parseInt(startLength),
                endLength: parseInt(endLength),
                startWidth: parseInt(startWidth),
                endWidth: parseInt(endWidth),
                severity: parseInt(severity)
            };

            inspectionData.bottomDefects.push(defect);
            updateBottomDefectTable();
            clearBottomForm();
            alert('Bottom defect added successfully!');
        }

        // Update top defect table
        function updateTopDefectTable() {
            const tbody = document.querySelector('#topDefectTable tbody');
            tbody.innerHTML = '';
            
            inspectionData.topDefects.forEach(defect => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${defect.name}</td>
                    <td>${defect.startLength}</td>
                    <td>${defect.endLength}</td>
                    <td>${defect.startWidth}</td>
                    <td>${defect.endWidth}</td>
                    <td>${defect.severity}</td>
                `;
            });
        }

        // Update bottom defect table
        function updateBottomDefectTable() {
            const tbody = document.querySelector('#bottomDefectTable tbody');
            tbody.innerHTML = '';
            
            inspectionData.bottomDefects.forEach(defect => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${defect.name}</td>
                    <td>${defect.startLength}</td>
                    <td>${defect.endLength}</td>
                    <td>${defect.startWidth}</td>
                    <td>${defect.endWidth}</td>
                    <td>${defect.severity}</td>
                `;
            });
        }

        // Clear top form
        function clearTopForm() {
            document.getElementById('topDefectName').value = '';
            document.getElementById('topStartLength').value = '';
            document.getElementById('topEndLength').value = '';
            document.getElementById('topStartWidth').value = '';
            document.getElementById('topEndWidth').value = '';
            document.getElementById('topSeverity').value = '';
        }

        // Clear bottom form
        function clearBottomForm() {
            document.getElementById('bottomDefectName').value = '';
            document.getElementById('bottomStartLength').value = '';
            document.getElementById('bottomEndLength').value = '';
            document.getElementById('bottomStartWidth').value = '';
            document.getElementById('bottomEndWidth').value = '';
            document.getElementById('bottomSeverity').value = '';
        }

        // Toggle hold description
        function toggleHoldDescription() {
            const status = document.getElementById('inspectionStatus').value;
            const holdGroup = document.getElementById('holdDescriptionGroup');
            
            if (status === 'Hold') {
                holdGroup.classList.add('show');
            } else {
                holdGroup.classList.remove('show');
            }
        }

        // Save remarks
        function saveRemarks() {
            const remarks = document.getElementById('inspectionRemarks').value;
            inspectionData.remarks = remarks;
            alert('Remarks saved successfully!');
        }

        // Save status
        function saveStatus() {
            const status = document.getElementById('inspectionStatus').value;
            const holdDescription = document.getElementById('holdDescription').value;
            
            if (!status) {
                alert('Please select inspection status');
                return;
            }

            inspectionData.status = status;
            inspectionData.holdDescription = holdDescription;
            alert('Status saved successfully!');
        }

        // Generate final report
        function generateReport() {
            const coilId = document.getElementById('coilId').value;
            
            if (!coilId) {
                alert('Please select Coil ID');
                return;
            }

            inspectionData.coilId = coilId;

            // Create report content
            let reportContent = `
=== DLS CGL2 INSPECTION REPORT ===
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

COIL ID: ${inspectionData.coilId}

TOP INSPECTION DEFECTS:
${inspectionData.topDefects.map(defect => 
    `- ${defect.name}: Length(${defect.startLength}-${defect.endLength}mm), Width(${defect.startWidth}-${defect.endWidth}mm), Severity: ${defect.severity}`
).join('\n')}

BOTTOM INSPECTION DEFECTS:
${inspectionData.bottomDefects.map(defect => 
    `- ${defect.name}: Length(${defect.startLength}-${defect.endLength}mm), Width(${defect.startWidth}-${defect.endWidth}mm), Severity: ${defect.severity}`
).join('\n')}

INSPECTION REMARKS:
${inspectionData.remarks}

INSPECTION STATUS: ${inspectionData.status}
${inspectionData.status === 'Hold' ? `HOLD REASON: ${inspectionData.holdDescription}` : ''}

Report generated on: ${new Date().toLocaleString()}
            `;

            // Display report in alert (in real application, this would be saved/printed)
            alert('Report Generated Successfully!\n\n' + reportContent);
            
            // Log to console for development
            console.log('Final Inspection Report:', reportContent);
            console.log('Inspection Data:', inspectionData);
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            updateTopDefectTable();
            updateBottomDefectTable();
        });