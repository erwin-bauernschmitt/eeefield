import numpy as np
from scipy.special import gamma
import os

# Generate x values from 1.01 to 2.00 in steps of 0.01
x_values = np.arange(1.01, 2.01, 0.01)  # 2.01 to include 2.00
gamma_values = gamma(x_values)  # Compute gamma for all x

# Number of pairs per row (each pair is x and Gamma(x))
pairs_per_row = 4
total_rows = len(x_values) // pairs_per_row  # 100 values / 4 pairs = 25 rows

# Get the directory of the script and construct the output file path
script_dir = os.path.dirname(__file__)
output_file = os.path.join(script_dir, 'gamma_table.html')

# Start building the HTML table
html = '<table class="transform-table">\n'
html += '    <thead>\n'
html += '        <tr>\n'

# Header row: four pairs of x and Gamma(x)
for i in range(pairs_per_row):
    html += f'            <th>\\( \\boldsymbol{{x}} \\)</th>\n'
    html += f'            <th>\\( \\boldsymbol{{\\Gamma(x)}} \\)</th>\n'
html += '        </tr>\n'
html += '    </thead>\n'

# Body of the table
html += '    <tbody>\n'

# Iterate over rows (25 rows, one for each group of 4 values)
for row in range(total_rows):
    html += '        <tr>\n'
    # For each row, get 4 x values (spaced by 4 steps) and their Gamma(x)
    for pair_idx in range(pairs_per_row):
        idx = pair_idx * total_rows + row  # Index increases down columns
        if idx < len(x_values):  # Ensure we don't exceed array bounds
            x = x_values[idx]
            g = gamma_values[idx]
            html += f'            <td>\\( {x:.2f} \\)</td>\n'
            html += f'            <td>\\( {g:.4f} \\)</td>\n'
    html += '        </tr>\n'

html += '    </tbody>\n'
html += '</table>'

# Write the HTML to a file in the script's directory
with open(output_file, 'w') as f:
    f.write(html)

print(f"HTML table generated and saved as '{output_file}'")