import { ScholarlyWork, CitationStyle } from '../types';

export function formatAuthorNameAPA(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const initials = parts
    .slice(0, parts.length - 1)
    .map((p) => `${p[0].toUpperCase()}.`)
    .join(' ');
  return `${lastName}, ${initials}`;
}

export function formatAuthorsAPA(authors: string[]): string {
  if (authors.length === 0) return 'Anonymous';
  if (authors.length === 1) return formatAuthorNameAPA(authors[0]);
  if (authors.length === 2) {
    return `${formatAuthorNameAPA(authors[0])} & ${formatAuthorNameAPA(authors[1])}`;
  }
  const formatted = authors.map(formatAuthorNameAPA);
  const allExceptLast = formatted.slice(0, -1).join(', ');
  return `${allExceptLast}, & ${formatted[formatted.length - 1]}`;
}

export function formatAuthorsMLA(authors: string[]): string {
  if (authors.length === 0) return 'Anonymous';
  const firstParts = authors[0].trim().split(/\s+/);
  const firstFormatted = firstParts.length > 1 
    ? `${firstParts[firstParts.length - 1]}, ${firstParts.slice(0, -1).join(' ')}` 
    : authors[0];
  if (authors.length === 1) return `${firstFormatted}.`;
  if (authors.length === 2) return `${firstFormatted}, and ${authors[1]}.`;
  return `${firstFormatted}, et al.`;
}

export function formatAuthorsVancouver(authors: string[]): string {
  return authors
    .map((a) => {
      const parts = a.trim().split(/\s+/);
      if (parts.length === 1) return parts[0];
      const last = parts[parts.length - 1];
      const initials = parts.slice(0, -1).map((p) => p[0].toUpperCase()).join('');
      return `${last} ${initials}`;
    })
    .join(', ');
}

export function generateCitation(work: ScholarlyWork, style: CitationStyle = 'APA_7'): string {
  const year = work.year;
  const title = work.title;
  const repoName = 'Trinity College of Nursing Student Scholarly Repository';
  const course = work.course;
  const batch = work.batch;

  switch (style) {
    case 'APA_7': {
      // APA 7th format specified in user prompt / PDF:
      // Dela Cruz, J. A., Santos, M. P., & Reyes, A. L. (2026). Title of case presentation. Student Nursing Scholarly Repository.
      const apaAuthors = formatAuthorsAPA(work.authors);
      return `${apaAuthors} (${year}). ${title} [${work.outputType}, ${batch}]. ${repoName}. https://repository.tua.edu.ph/nursing/${work.id}`;
    }
    case 'HARVARD': {
      const hAuthors = formatAuthorsAPA(work.authors);
      return `${hAuthors} ${year}, '${title}', ${work.outputType}, ${batch}, ${repoName}, accessed ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`;
    }
    case 'VANCOUVER': {
      const vAuthors = formatAuthorsVancouver(work.authors);
      return `${vAuthors}. ${title} [${work.outputType}]. Manila: ${repoName}; ${year}. Available from: https://repository.tua.edu.ph/nursing/${work.id}`;
    }
    case 'MLA_9': {
      const mlaAuthors = formatAuthorsMLA(work.authors);
      return `${mlaAuthors} "${title}." ${work.outputType}, ${course}, ${batch}, ${repoName}, ${year}.`;
    }
    case 'CHICAGO': {
      const cAuthors = formatAuthorsMLA(work.authors);
      return `${cAuthors} "${title}." ${work.outputType}, ${batch}, ${course}. ${repoName}, ${year}.`;
    }
    default:
      return `${formatAuthorsAPA(work.authors)} (${year}). ${title}. ${repoName}.`;
  }
}

export function generateBibTeX(work: ScholarlyWork): string {
  const citeKey = `${work.authors[0]?.split(' ').pop()?.toLowerCase() || 'nursing'}${work.year}${work.id.replace(/[^a-z0-9]/gi, '')}`;
  return `@misc{${citeKey},
  author = {${work.authors.join(' and ')}},
  title = {${work.title}},
  year = {${work.year}},
  howpublished = {Trinity College of Nursing Student Scholarly Repository},
  note = {${work.outputType} - ${work.batch}, Course: ${work.course}},
  url = {https://repository.tua.edu.ph/nursing/${work.id}}
}`;
}

export function generateRIS(work: ScholarlyWork): string {
  return `TY  - RPRT
TI  - ${work.title}
${work.authors.map((a) => `AU  - ${a}`).join('\n')}
PY  - ${work.year}
PB  - Trinity College of Nursing Student Scholarly Repository
M3  - ${work.outputType}
KW  - ${work.keywords.join('; ')}
N1  - Batch: ${work.batch} | Course: ${work.course} | Call No: ${work.physicalLibrary.callNumber}
UR  - https://repository.tua.edu.ph/nursing/${work.id}
ER  - `;
}
