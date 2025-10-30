
// Application state
let editMode = false;
let cvData;

// Detect if this is a Resume (American) or CV (International)
const isResume = window.location.pathname.includes('_Resume.html');
const docType = isResume ? 'Resume' : 'CV';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load CV data from JSON script tag
    const cvDataElement = document.getElementById('cv-data-json');
    cvData = JSON.parse(cvDataElement.textContent);
    
    // Initialize expanded/collapsed state for all items (defaults to expanded)
    initializeItemStates();
    
    renderCV();
    initializeEventListeners();
    adaptDocumentLanguage();
    
});

function initializeItemStates() {
    // Add _uiState property to track expanded/collapsed state without modifying original JSON
    if (!cvData._uiState) {
        cvData._uiState = {};
    }
    
    // Initialize education items (all expanded by default)
    if (cvData.education && Array.isArray(cvData.education)) {
        cvData._uiState.education = cvData.education.map(() => ({ expanded: true }));
    }
    
    // Initialize work items (all expanded by default)
    if (cvData.work && Array.isArray(cvData.work)) {
        cvData._uiState.work = cvData.work.map(() => ({ expanded: true }));
    }
    
    // Initialize awards items (all expanded by default)
    if (cvData.awards && Array.isArray(cvData.awards)) {
        cvData._uiState.awards = cvData.awards.map(() => ({ expanded: true }));
    }
    
    // Initialize certificates items (all expanded by default)
    if (cvData.certificates && Array.isArray(cvData.certificates)) {
        cvData._uiState.certificates = cvData.certificates.map(() => ({ expanded: true }));
    }
    
    // Initialize volunteer items (all expanded by default)
    if (cvData.volunteer && Array.isArray(cvData.volunteer)) {
        cvData._uiState.volunteer = cvData.volunteer.map(() => ({ expanded: true }));
    }
    
    // Initialize publications items (all expanded by default)
    if (cvData.publications && Array.isArray(cvData.publications)) {
        cvData._uiState.publications = cvData.publications.map(() => ({ expanded: true }));
    }
    
    // Initialize projects items (all expanded by default)
    if (cvData.projects && Array.isArray(cvData.projects)) {
        cvData._uiState.projects = cvData.projects.map(() => ({ expanded: true }));
    }
    
    // Initialize interests items (all expanded by default)
    if (cvData.interests && Array.isArray(cvData.interests)) {
        cvData._uiState.interests = cvData.interests.map(() => ({ expanded: true }));
    }
}

// Helper functions to manage item state
function getItemState(section, index) {
    if (!cvData._uiState || !cvData._uiState[section] || !cvData._uiState[section][index]) {
        return { expanded: true }; // Default to expanded
    }
    return cvData._uiState[section][index];
}

function setItemState(section, index, expanded) {
    if (!cvData._uiState) {
        cvData._uiState = {};
    }
    if (!cvData._uiState[section]) {
        cvData._uiState[section] = [];
    }
    if (!cvData._uiState[section][index]) {
        cvData._uiState[section][index] = {};
    }
    cvData._uiState[section][index].expanded = expanded;
}

function toggleItemState(section, index) {
    const currentState = getItemState(section, index);
    const newState = !currentState.expanded;
    setItemState(section, index, newState);
    return newState;
}

function renderCV() {
    renderPersonalInfo();
    renderSkills();
    renderEducation();
    renderAwards();
    renderCertificates();
    renderEmployment();
    renderVolunteer();
    renderPublications();
    renderProjects();
    renderLanguages();
    renderInterests();
    renderReferences();
    
    // Add toggle buttons if in edit mode
    if (editMode) {
        addToggleButtonsToItems();
    }
}

function renderPersonalInfo() {
    const basics = cvData.basics;
    document.getElementById('name').textContent = basics.name;
    
    // Handle location/address
    const loc = basics.location;
    const address = [loc.address, loc.city, loc.region, loc.postalCode].filter(Boolean).join(', ');
    document.getElementById('address').textContent = address;
    
    document.getElementById('phone').innerHTML = `<a href="tel:${basics.phone}" target="_blank">${basics.phone}</a>`;
    document.getElementById('email').innerHTML = `<a href="mailto:${basics.email}" target="_blank">${basics.email}</a>`;
    
    // Add professional links if present
    const contactDetails = document.querySelector('.contact-details');
    
    // Add website if present
    if (basics.url) {
        const linkSpan = document.createElement('span');
        linkSpan.innerHTML = `<a href="${basics.url}" target="_blank" rel="noopener noreferrer">Website</a>`;
        contactDetails.appendChild(linkSpan);
    }
    
    // Add profiles (LinkedIn, GitHub, etc.)
    if (basics.profiles && basics.profiles.length > 0) {
        basics.profiles.forEach(profile => {
            const linkSpan = document.createElement('span');
            linkSpan.innerHTML = `<a href="${profile.url}" target="_blank" rel="noopener noreferrer">${profile.network}</a>`;
            contactDetails.appendChild(linkSpan);
        });
    }
    
    // Handle summary content
    const statementElement = document.getElementById('personal-statement');
    statementElement.innerHTML = parseMarkdown(basics.summary);
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !cvData.skills) return;
    
    container.innerHTML = '<h2>Skills & Expertise</h2>';
    
    const skillsGrid = document.createElement('div');
    skillsGrid.className = 'skills-grid';
    
    cvData.skills.forEach(skill => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'skill-category-title';
        categoryTitle.textContent = skill.name;
        skillCategory.appendChild(categoryTitle);
        
        if (skill.keywords && skill.keywords.length > 0) {
            const skillsList = document.createElement('div');
            skillsList.className = 'skills-list';
            skillsList.textContent = skill.keywords.join(' • ');
            skillCategory.appendChild(skillsList);
        }
        
        if (skill.level) {
            const levelSpan = document.createElement('span');
            levelSpan.className = 'skill-level';
            levelSpan.textContent = ` (${skill.level})`;
            categoryTitle.appendChild(levelSpan);
        }
        
        skillsGrid.appendChild(skillCategory);
    });
    
    container.appendChild(skillsGrid);
}

function renderEducation() {
    const container = document.getElementById('education-list');
    container.innerHTML = '';
    
    if (!cvData.education || cvData.education.length === 0) return;
    
    cvData.education.forEach((item, index) => {
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.dataset.section = 'education';
        educationItem.dataset.index = index;
        
        const itemState = getItemState('education', index);
        if (!itemState.expanded) {
            educationItem.classList.add('hidden');
        }
        
        const studyType = item.studyType || '';
        const area = item.area || '';
        const institution = item.institution || '';
        const startDate = item.startDate || '';
        const endDate = item.endDate || 'Present';
        const score = item.score ? ` - ${item.score}` : '';
        
        let content = `<strong>${studyType}</strong>`;
        if (area) content += ` in <strong>${area}</strong>`;
        if (score) content += score;
        
        if (item.courses && item.courses.length > 0) {
            content += '<br/>Key courses: ' + item.courses.join(', ');
        }
        
        educationItem.innerHTML = `
            <div class="qual-content">${content}</div>
            <div class="qual-establishment">${institution} (${formatDate(startDate)} - ${formatDate(endDate)})</div>
        `;
        
        container.appendChild(educationItem);
    });
}

function formatDate(dateStr) {
    if (!dateStr || dateStr === 'Present' || dateStr === '') return dateStr || 'Present';
    
    // If it's already in a nice format like "1984" or "Jan 1984", return it
    if (!/\d{4}-\d{2}/.test(dateStr)) return dateStr;
    
    // Parse ISO format dates
    const [year, month] = dateStr.split('-');
    if (!month) return year;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
}

function renderAwards() {
    const container = document.getElementById('awards-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!cvData.awards || cvData.awards.length === 0) return;
    
    cvData.awards.forEach((award, index) => {
        const awardItem = document.createElement('div');
        awardItem.className = 'achievement-item';
        awardItem.dataset.section = 'awards';
        awardItem.dataset.index = index;
        
        const itemState = getItemState('awards', index);
        if (!itemState.expanded) {
            awardItem.classList.add('hidden');
        }
        
        const date = award.date ? ` (${formatDate(award.date)})` : '';
        const awarder = award.awarder ? ` - ${award.awarder}` : '';
        
        awardItem.innerHTML = `
            <h3 class="achievement-title">${award.title}${date}</h3>
            <div class="achievement-description">${awarder}${awarder && award.summary ? '<br/>' : ''}${parseMarkdown(award.summary || '', true)}</div>
        `;
        
        container.appendChild(awardItem);
    });
}

function renderCertificates() {
    const container = document.getElementById('certificates-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!cvData.certificates || cvData.certificates.length === 0) return;
    
    cvData.certificates.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'certificate-item';
        
        const date = cert.date ? formatDate(cert.date) : '';
        
        let certContent = `<div class="certificate-name">${cert.name}</div>`;
        certContent += `<ul class="certificate-details">`;
        if (cert.issuer) {
            certContent += `<li><strong>Issuer:</strong> ${cert.issuer}</li>`;
        }
        if (date) {
            certContent += `<li><strong>Date:</strong> ${date}</li>`;
        }
        if (cert.url) {
            certContent += `<li><a href="${cert.url}" target="_blank" rel="noopener noreferrer">View Certificate</a></li>`;
        }
        certContent += `</ul>`;
        
        certItem.innerHTML = certContent;
        container.appendChild(certItem);
    });
}


function calculateEmploymentBreakPoint() {
    const viewportWidth = window.innerWidth;
    
    // Phone: single column layout, no column break needed
    if (viewportWidth <= 768) {
        return null; // Never break out on mobile
    }
    
    // Get the education column height (left column)
    const educationSection = document.querySelector('.education-section');
    if (!educationSection) {
        return null;
    }
    
    // Calculate the actual height of the education/achievements column
    const leftColumnHeight = educationSection.offsetHeight;
    
    // Add safety margin (50px for spacing)
    const targetHeight = leftColumnHeight + 50;
    
    return targetHeight;
}

function renderEmployment() {
    const container = document.getElementById('employment-list');
    const breakoutContainer = document.getElementById('employment-breakout');
    
    if (!container) return;
    
    container.innerHTML = '';
    breakoutContainer.innerHTML = '';
    
    const work = cvData.work;
    if (!work || work.length === 0) return;
    
    const allEmploymentItems = [];
    
    work.forEach((item, index) => {
        const employmentItem = document.createElement('div');
        employmentItem.className = 'employment-item single-position';
        employmentItem.dataset.section = 'work';
        employmentItem.dataset.index = index;
        
        const itemState = getItemState('work', index);
        if (!itemState.expanded) {
            employmentItem.classList.add('hidden');
        }
        
        const company = item.name || '';
        const position = item.position || '';
        const url = item.url || '';
        const startDate = item.startDate || '';
        const endDate = item.endDate || 'Present';
        const summary = item.summary || '';
        const highlights = item.highlights || [];
        
        const highlightsList = highlights.map(highlight => {
            const parsed = parseMarkdown(highlight, true);
            return `<li>${parsed}</li>`;
        }).join('');
        
        const companyLink = url ? 
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="company-name">${company}</a>` :
            `<span class="company-name">${company}</span>`;
        
        employmentItem.innerHTML = `
            <h3 class="single-position-title">
                <span class="position-name">${position}</span> at ${companyLink}
                <span class="job-dates">(${formatDate(startDate)} - ${formatDate(endDate)})</span>
            </h3>
            <div class="job-description">${parseMarkdown(summary, true)}</div>
            ${highlightsList ? `<ul class="achievements">${highlightsList}</ul>` : ''}
        `;
        
        allEmploymentItems.push(employmentItem);
    });
    
    // Distribute items based on height
    distributeEmploymentItems(container, breakoutContainer, allEmploymentItems);
    
    // Add toggle buttons if in edit mode
    if (editMode) {
        const employmentItems = document.querySelectorAll('.employment-item[data-section="work"]');
        employmentItems.forEach(item => {
            addToggleButton(item);
        });
    }
}

function distributeEmploymentItems(container, breakoutContainer, items) {
    // Get the target height for breaking out
    const targetHeight = calculateEmploymentBreakPoint();
    
    // If no target height (mobile), add everything to main container
    if (!targetHeight) {
        items.forEach(item => container.appendChild(item));
        return;
    }
    
    let hasStartedBreakout = false;
    let continuationIndicatorAdded = false;
    
    // Add items one by one, checking height
    items.forEach((item, index) => {
        if (!hasStartedBreakout) {
            // Add to main container
            container.appendChild(item);
            
            // Check if we've exceeded the height
            const currentHeight = container.offsetHeight;
            if (currentHeight > targetHeight) {
                // Move this item to breakout
                container.removeChild(item);
                
                // Add continuation indicator if first breakout
                if (!continuationIndicatorAdded) {
                    const continuationIndicator = document.createElement('div');
                    continuationIndicator.className = 'employment-continuation';
                    continuationIndicator.innerHTML = `<em>Employment continued...</em>`;
                    breakoutContainer.appendChild(continuationIndicator);
                    continuationIndicatorAdded = true;
                }
                
                breakoutContainer.appendChild(item);
                hasStartedBreakout = true;
            }
        } else {
            // Already breaking out, add to breakout container
            breakoutContainer.appendChild(item);
        }
    });
}

function parseMarkdown(text, skipParagraphs = false) {
    // Simple markdown parser for basic formatting
    let result = text
        // Headers
        .replace(/^## (.+)$/gm, '<h3>$1</h3>')
        .replace(/^# (.+)$/gm, '<h2>$1</h2>')
        // Process markdown links - mailto first, then regular links
        .replace(/\[([^\]]+)\]\(mailto:([^)]+)\)/g, '<a href="mailto:$2" target="_blank">$1</a>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            // Skip if this was already processed as a mailto link
            if (url.startsWith('mailto:')) return match;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        })
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Only add paragraph handling if not skipping
    if (!skipParagraphs) {
        result = result
            .split('\n\n')
            .map(block => {
                // Don't wrap headers in paragraphs
                if (block.trim().startsWith('<h')) {
                    return block.trim();
                }
                // Wrap other content in paragraphs
                return block.trim() ? `<p>${block.trim()}</p>` : '';
            })
            .filter(block => block)
            .join('\n\n');
    }
    
    return result;
}

function renderVolunteer() {
    const container = document.getElementById('volunteer-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!cvData.volunteer || cvData.volunteer.length === 0) return;
    
    cvData.volunteer.forEach((item, index) => {
        const volunteerItem = document.createElement('div');
        volunteerItem.className = 'employment-item';
        volunteerItem.dataset.section = 'volunteer';
        volunteerItem.dataset.index = index;
        
        const itemState = getItemState('volunteer', index);
        if (!itemState.expanded) {
            volunteerItem.classList.add('hidden');
        }
        
        const org = item.organization || '';
        const position = item.position || '';
        const url = item.url || '';
        const startDate = item.startDate || '';
        const endDate = item.endDate || 'Present';
        const summary = item.summary || '';
        const highlights = item.highlights || [];
        
        const highlightsList = highlights.map(highlight => `<li>${parseMarkdown(highlight, true)}</li>`).join('');
        
        const orgLink = url ? 
            `<a href="${url}" target="_blank" rel="noopener noreferrer">${org}</a>` : org;
        
        volunteerItem.innerHTML = `
            <h3 class="single-position-title">
                <span class="position-name">${position}</span> at ${orgLink}
                <span class="job-dates">(${formatDate(startDate)} - ${formatDate(endDate)})</span>
            </h3>
            <div class="job-description">${parseMarkdown(summary, true)}</div>
            ${highlightsList ? `<ul class="achievements">${highlightsList}</ul>` : ''}
        `;
        
        container.appendChild(volunteerItem);
    });
    
    // Add toggle buttons if in edit mode
    if (editMode) {
        const volunteerItems = document.querySelectorAll('.employment-item[data-section="volunteer"]');
        volunteerItems.forEach(item => {
            addToggleButton(item);
        });
    }
}

function renderPublications() {
    const container = document.getElementById('publications-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!cvData.publications || cvData.publications.length === 0) return;
    
    cvData.publications.forEach((pub, index) => {
        const pubItem = document.createElement('div');
        pubItem.className = 'publication-item';
        pubItem.dataset.section = 'publications';
        pubItem.dataset.index = index;
        
        const itemState = getItemState('publications', index);
        if (!itemState.expanded) {
            pubItem.classList.add('hidden');
        }
        
        const name = pub.name || '';
        const publisher = pub.publisher || '';
        const date = pub.releaseDate || '';
        const url = pub.url || '';
        const summary = pub.summary || '';
        
        let pubContent = `<h3>${name}</h3>`;
        pubContent += `<div class="publication-meta">${publisher}${date ? ` • ${formatDate(date)}` : ''}</div>`;
        if (summary) {
            pubContent += `<div class="publication-summary">${parseMarkdown(summary, true)}</div>`;
        }
        if (url) {
            pubContent += `<div><a href="${url}" target="_blank" rel="noopener noreferrer">View Publication</a></div>`;
        }
        
        pubItem.innerHTML = pubContent;
        container.appendChild(pubItem);
    });
    
    // Add toggle buttons if in edit mode
    if (editMode) {
        const publicationItems = document.querySelectorAll('.publication-item[data-section="publications"]');
        publicationItems.forEach(item => {
            addToggleButton(item);
        });
    }
}

function renderProjects() {
    const container = document.getElementById('projects-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!cvData.projects || cvData.projects.length === 0) return;
    
    cvData.projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.dataset.section = 'projects';
        projectItem.dataset.index = index;
        
        const itemState = getItemState('projects', index);
        if (!itemState.expanded) {
            projectItem.classList.add('hidden');
        }
        
        const name = project.name || '';
        const description = project.description || '';
        const highlights = project.highlights || [];
        const keywords = project.keywords || [];
        const startDate = project.startDate || '';
        const endDate = project.endDate || '';
        const url = project.url || '';
        const roles = project.roles || [];
        
        let projectContent = `<h3>${name}`;
        if (startDate) {
            projectContent += ` <span class="job-dates">(${formatDate(startDate)} - ${formatDate(endDate || 'Present')})</span>`;
        }
        projectContent += `</h3>`;
        
        if (description) {
            projectContent += `<div class="project-description">${parseMarkdown(description, true)}</div>`;
        }
        
        if (roles.length > 0) {
            projectContent += `<div class="project-roles"><strong>Role:</strong> ${roles.join(', ')}</div>`;
        }
        
        if (highlights.length > 0) {
            const highlightsList = highlights.map(h => `<li>${parseMarkdown(h, true)}</li>`).join('');
            projectContent += `<ul class="achievements">${highlightsList}</ul>`;
        }
        
        if (keywords.length > 0) {
            projectContent += `<div class="project-keywords"><strong>Technologies:</strong> ${keywords.join(' • ')}</div>`;
        }
        
        if (url) {
            projectContent += `<div><a href="${url}" target="_blank" rel="noopener noreferrer">View Project</a></div>`;
        }
        
        projectItem.innerHTML = projectContent;
        container.appendChild(projectItem);
    });
    
    // Add toggle buttons if in edit mode
    if (editMode) {
        const projectItems = document.querySelectorAll('.project-item[data-section="projects"]');
        projectItems.forEach(item => {
            addToggleButton(item);
        });
    }
}

function renderLanguages() {
    const container = document.getElementById('languages-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!cvData.languages || cvData.languages.length === 0) return;
    
    const langList = document.createElement('ul');
    langList.className = 'languages-list';
    
    cvData.languages.forEach(lang => {
        const langItem = document.createElement('li');
        langItem.innerHTML = `<strong>${lang.language}</strong>: ${lang.fluency}`;
        langList.appendChild(langItem);
    });
    
    container.appendChild(langList);
}

function renderInterests() {
    const container = document.getElementById('interests-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!cvData.interests || cvData.interests.length === 0) return;
    
    cvData.interests.forEach((interest, index) => {
        const interestItem = document.createElement('div');
        interestItem.className = 'interest-item';
        interestItem.dataset.section = 'interests';
        interestItem.dataset.index = index;
        
        const itemState = getItemState('interests', index);
        if (!itemState.expanded) {
            interestItem.classList.add('hidden');
        }
        
        let content = `<h3>${interest.name}</h3>`;
        if (interest.keywords && interest.keywords.length > 0) {
            content += `<div class="interest-keywords">${interest.keywords.join(' • ')}</div>`;
        }
        
        interestItem.innerHTML = content;
        container.appendChild(interestItem);
    });
    
    // Add toggle buttons if in edit mode
    if (editMode) {
        const interestItems = document.querySelectorAll('.interest-item[data-section="interests"]');
        interestItems.forEach(item => {
            addToggleButton(item);
        });
    }
}

function renderReferences() {
    const container = document.getElementById('references-list');
    const section = document.querySelector('.references-section');

    if (!container) return;
    container.innerHTML = '';

    // Check if references exist and have content
    if (!cvData.references || cvData.references.length === 0) {
        // Hide the entire references section if no references
        if (section) {
            section.style.display = 'none';
        }
        return;
    }

    // Show the section if it was previously hidden
    if (section) {
        section.style.display = 'block';
    }

    cvData.references.forEach(reference => {
        const referenceItem = document.createElement('div');
        referenceItem.className = 'reference-item';

        referenceItem.innerHTML = `
            <div class="reference-name">${reference.name}</div>
            <div class="reference-details">${parseMarkdown(reference.reference, true)}</div>
        `;

        container.appendChild(referenceItem);
    });
}

function initializeCredentialOverlay() {
    const overlay = document.getElementById('credential-overlay');
    const closeBtn = document.getElementById('close-overlay');
    const overlayBackground = overlay.querySelector('.overlay-background');
    const credentialText = document.getElementById('credential-text');

    // Function to hide overlay
    function hideOverlay() {
        overlay.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = '';
    }

    // Helper function to show overlay for any section
    function showOverlayForSection(section, index) {
        const item = cvData[section][index];

        // Check if this item has verifiable data
        if (!item || !item.verifiable || item.verifiable.length === 0) {
            console.log('No verifiable data for this item');
            return;
        }

        // Populate overlay with plain text (one line per item)
        credentialText.textContent = item.verifiable.join('\n');

        overlay.style.display = 'flex';
        // Prevent body scrolling when overlay is open
        document.body.style.overflow = 'hidden';
    }

    // Click anywhere to close overlay
    overlay.addEventListener('click', hideOverlay);

    // Escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            hideOverlay();
        }
    });

    // Add click handlers to education and work items
    // Use event delegation to handle dynamically rendered items
    document.addEventListener('click', function(e) {
        // Don't trigger overlay in edit mode when clicking toggle button
        if (editMode && e.target.classList.contains('toggle-btn')) {
            return;
        }

        // Check if clicked element is an education item or inside one
        const educationItem = e.target.closest('.education-item');
        if (educationItem) {
            const index = parseInt(educationItem.dataset.index);
            if (!isNaN(index) && cvData.education[index]) {
                showOverlayForSection('education', index);
            }
            return;
        }

        // Check if clicked element is an employment item or inside one
        const employmentItem = e.target.closest('.employment-item');
        if (employmentItem) {
            const index = parseInt(employmentItem.dataset.index);
            if (!isNaN(index) && cvData.work[index]) {
                showOverlayForSection('work', index);
            }
            return;
        }
    });
}

function initializeEventListeners() {
    // Initialize credential overlay listeners
    initializeCredentialOverlay();

    // Print button
    document.getElementById('print-btn').addEventListener('click', function() {
        window.print();
    });
    
    // Download as Image button
    const downloadBtn = document.createElement('button');
    downloadBtn.id = 'download-image-btn';
    downloadBtn.title = `Download ${docType} as Image`;
    downloadBtn.innerHTML = '🖼️'; // Image icon
    downloadBtn.addEventListener('click', function() {
        downloadImage();
    });
    
    // Add download button next to print button
    const printBtn = document.getElementById('print-btn');
    if (printBtn && printBtn.parentElement) {
        printBtn.parentElement.insertBefore(downloadBtn, printBtn.nextSibling);
    }
    
    // Edit mode toggle
    document.getElementById('toggle-edit').addEventListener('click', function() {
        editMode = !editMode;
        document.body.classList.toggle('edit-mode', editMode);
        
        // Update button appearance
        this.style.background = editMode ? '#e74c3c' : 'var(--accent-color)';
        this.title = editMode ? 'Exit Edit Mode' : 'Toggle Edit Mode';
        
        // Re-render sections to add/remove toggle buttons
        renderVolunteer();
        renderPublications();
        renderProjects();
        renderLanguages();
        renderInterests();
        
        // Add or remove toggle buttons for other sections
        if (editMode) {
            addToggleButtonsToItems();
        } else {
            removeToggleButtonsFromItems();
        }
    });
    
    // Responsive column break - recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            renderEmployment(); // Re-render with new column break point
        }, 250); // Debounce resize events
    });
    
    // Item toggle in edit mode
    document.addEventListener('click', function(e) {
        if (!editMode) return;
        
        // Check if clicked on toggle button
        if (e.target.classList.contains('toggle-btn')) {
            const item = e.target.closest('.education-item, .employment-item, .achievement-item, .publication-item, .project-item, .interest-item');
            if (item && item.dataset.section && item.dataset.index !== undefined) {
                const section = item.dataset.section;
                const index = parseInt(item.dataset.index);
                const newState = toggleItemState(section, index);
                
                // Update visual state
                if (newState) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
                
                // Update toggle button
                updateToggleButton(item, newState);
                
                // Show feedback
                showToggleFeedback(newState ? 'Item expanded' : 'Item collapsed');
                
                // Recalculate employment breakout when items are toggled
                const shouldRecalculate = item.classList.contains('education-item') || 
                                          item.classList.contains('achievement-item') ||
                                          item.classList.contains('employment-item');
                if (shouldRecalculate) {
                    setTimeout(() => {
                        renderEmployment();
                    }, 350);
                }
            }
        }
    });
}

function updateToggleButton(element, expanded) {
    const toggleBtn = element.querySelector('.toggle-btn');
    if (toggleBtn) {
        toggleBtn.textContent = expanded ? '-' : '+';
        toggleBtn.title = expanded ? 'Collapse' : 'Expand';
    }
}

function addToggleButton(element) {
    // Only add if button doesn't exist
    if (element.querySelector('.toggle-btn')) return;
    
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-btn';
    
    // Get state from object
    if (element.dataset.section && element.dataset.index !== undefined) {
        const section = element.dataset.section;
        const index = parseInt(element.dataset.index);
        const itemState = getItemState(section, index);
        toggleBtn.textContent = itemState.expanded ? '-' : '+';
        toggleBtn.title = itemState.expanded ? 'Collapse' : 'Expand';
    }
    
    element.appendChild(toggleBtn);
}

function addToggleButtonsToItems() {
    const items = document.querySelectorAll('.education-item, .employment-item, .achievement-item, .publication-item, .project-item, .interest-item');
    items.forEach(item => {
        addToggleButton(item);
    });
}

function removeToggleButtonsFromItems() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => btn.remove());
}

function showToggleFeedback(message) {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 1.5 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(feedback)) {
                document.body.removeChild(feedback);
            }
        }, 300);
    }, 1500);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Function to adapt document language based on type
function adaptDocumentLanguage() {
    // Update document title
    document.title = document.title.replace(/CV|Resume/, docType);
    
    // Update print button title
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.title = `Print ${docType}`;
    }
    
    // Update any CV/Resume text in the page
    document.querySelectorAll('*').forEach(element => {
        // Skip script and style elements
        if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE' && element.childNodes && element.childNodes.length > 0) {
            element.childNodes.forEach(node => {
                if (node.nodeType === 3 && node.textContent) {
                    // Replace CV with Resume for American documents
                    if (isResume) {
                        node.textContent = node.textContent.replace(/\bCV\b/g, 'Resume');
                    }
                }
            });
        }
    });
}

// Image Download functionality with dynamic library loading
function downloadImage() {
    const basics = cvData.basics;
    const filename = `${basics.name.replace(/\s+/g, '_')}_${docType}`;

    // Check if html2canvas is available
    const html2canvasAvailable = typeof html2canvas !== 'undefined';

    if (html2canvasAvailable) {
        generateImage(filename);
    } else {
        // Dynamically load the required library
        loadHtml2CanvasLibrary().then(() => {
            generateImage(filename);
        }).catch(error => {
            console.error('Failed to load html2canvas library:', error);
            alert('Image generation library failed to load. Please try again.');
        });
    }
}

// Function to dynamically load html2canvas library
function loadHtml2CanvasLibrary() {
    return new Promise((resolve, reject) => {
        // Check if already loading or loaded
        if (window.html2canvasLoading) {
            // Wait for existing load to complete
            setTimeout(() => {
                if (typeof html2canvas !== 'undefined') {
                    resolve();
                } else {
                    reject(new Error('html2canvas still loading'));
                }
            }, 1000);
            return;
        }

        window.html2canvasLoading = true;

        // Show loading indicator
        showLoadingIndicator('Loading image library...');

        let html2canvasLoaded = typeof html2canvas !== 'undefined';

        function checkComplete() {
            if (html2canvasLoaded) {
                hideLoadingIndicator();
                window.html2canvasLoading = false;
                // Small delay to ensure library is fully initialized
                setTimeout(resolve, 100);
            }
        }

        // Load html2canvas if needed
        if (!html2canvasLoaded) {
            const html2canvasScript = document.createElement('script');
            html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            html2canvasScript.onload = () => {
                html2canvasLoaded = true;
                checkComplete();
            };
            html2canvasScript.onerror = () => {
                hideLoadingIndicator();
                window.html2canvasLoading = false;
                reject(new Error('Failed to load html2canvas'));
            };
            document.head.appendChild(html2canvasScript);
        }

        // If already loaded, resolve immediately
        if (html2canvasLoaded) {
            checkComplete();
        }
    });
}

// Show loading indicator
function showLoadingIndicator(message) {
    const indicator = document.createElement('div');
    indicator.id = 'pdf-loading-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #3498db;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        z-index: 2000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    indicator.innerHTML = `
        <div style="margin-bottom: 10px;">${message}</div>
        <div style="width: 30px; height: 3px; background: rgba(255,255,255,0.3); border-radius: 2px; overflow: hidden; margin: 0 auto;">
            <div style="width: 100%; height: 100%; background: white; animation: loadingBar 2s infinite;"></div>
        </div>
    `;
    document.body.appendChild(indicator);

    // Add loading animation CSS
    if (!document.getElementById('loading-animation-styles')) {
        const loadingStyles = document.createElement('style');
        loadingStyles.id = 'loading-animation-styles';
        loadingStyles.textContent = `
            @keyframes loadingBar {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(loadingStyles);
    }
}

// Hide loading indicator
function hideLoadingIndicator() {
    const indicator = document.getElementById('pdf-loading-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function generateImage(filename) {
    // Hide controls during image generation
    const controls = document.querySelector('.controls');
    if (controls) controls.style.display = 'none';

    const appElement = document.getElementById('app');

    const options = {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
    };

    html2canvas(appElement, options).then(canvas => {
        // Restore controls
        if (controls) controls.style.display = 'flex';

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${filename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }).catch(error => {
        if (controls) controls.style.display = 'flex';
        console.error('Image generation failed:', error);
        alert('Image generation failed. Please try again.');
    });
}

// Export functionality for potential future use
window.CVApp = {
    get data() { return cvData; },
    render: renderCV,
    toggleEditMode: function() {
        document.getElementById('toggle-edit').click();
    },
    print: function() {
        document.getElementById('print-btn').click();
    },
    downloadImage: downloadImage
};
