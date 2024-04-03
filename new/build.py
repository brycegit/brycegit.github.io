def insert_top_bottom(target_file, top_file, bottom_file):
  """Inserts content from top and bottom HTML files into a target HTML file,
  ensuring each element is on a separate line.

  Args:
      target_file: Path to the HTML file to modify (index.html).
      top_file: Path to the HTML file containing top content.
      bottom_file: Path to the HTML file containing bottom content.
  """
  with open(target_file, 'r') as target, open(top_file, 'r') as top, open(bottom_file, 'r') as bottom:
    target_content = target.read()
    top_content = top.read()
    bottom_content = bottom.read()

    # Insert top content with newline before
    modified_content = top_content + "\n" + target_content

    # Insert bottom content with newline before closing HTML tag
    modified_content = modified_content[:modified_content.rfind("</html>")] + "\n" + bottom_content + modified_content[modified_content.rfind("</html>") :]

  # Save the modified file
  with open(target_file, 'w') as target:
    target.write(modified_content)

# Replace these with your file paths
target_file = "index.html"
top_file = "top.html"
bottom_file = "bottom.html"

insert_top_bottom(target_file, top_file, bottom_file)

print(f"Successfully modified {target_file}")
