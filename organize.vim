


function! s:IsIgnored(str)
  return str =~ '(^#|^\s$)'
endfunction


function! s:SquashLine(line_number)
  execute "normal! " . nr2str(line_number) . "G^de"
  execute "insert! squash"
endfunction


function! s:OrganizeGitCommits()

  let stored_filename = ""
  let line_number = 0

  while line_number < line("$")
    let current_line = getline(line_number)
    let line_number += 1

    if (s:IsIgnored(current_line))
      continue
    endif


    let fields = split(current_line)
    filename = fields[3:3]
    if (stored_filename == filename)
      s:SquashLine(line_number)
    else
      stored_filename = filename
    endif

  endwhile
endfunction


command OrganizeCommits s:OrganizeGitCommits
