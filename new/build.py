def insert_header(target_file, header_file):
  """Inserts header content into a target HTML file's body tag, with a newline.

  Args:
      target_file: Path to the HTML file to modify.
      header_file: Path to the header HTML file.
  """
  with open(target_file, 'r') as target, open(header_file, 'r') as header:
    target_content = target.read()
    header_content = header.read().strip()  # Remove leading/trailing whitespace

    # Find the opening body tag
    body_start = target_content.find("<body")

    # Insert header content with newline after opening body tag
    modified_content = target_content[:body_start + len("<body>")] + "\n" + header_content + target_content[body_start + len("<body>"):]

  # Save the modified file
  with open(target_file, 'w') as target:
    target.write(modified_content)

def insert_footer(target_file, footer_file):
  """Inserts footer content into a target HTML file before the closing body tag.

  Args:
      target_file: Path to the HTML file to modify.
      footer_file: Path to the footer HTML file.
  """
  with open(target_file, 'r') as target, open(footer_file, 'r') as footer:
    target_content = target.read()
    footer_content = footer.read()

    # Find the closing body tag
    body_end = target_content.rfind("</body>")

    # Insert footer content right before the closing body tag
    modified_content = target_content[:body_end] + footer_content + target_content[body_end:]

  # Save the modified file
  with open(target_file, 'w') as target:
    target.write(modified_content)

# Replace these with your file paths
target_file = "index.html"
footer_file = "footer.html"
header_file = "header.html"

insert_header(target_file, header_file)
insert_footer(target_file, footer_file)

print(f"Successfully modified {target_file}")
