import numpy as np
from scipy.stats import norm
import os

# Generate base x values from 0.0 to 3.2 in steps of 0.1
base_x_values = np.arange(0.0, 4.5, 0.1)  # 3.3 to include 3.2, 33 values
num_rows = len(base_x_values)  # 33 rows
num_cols = 10  # Second decimal places: 0.00 to 0.09

# Get the directory of the script and construct the output file path
script_dir = os.path.dirname(__file__)
output_file = os.path.join(script_dir, 'normal_cdf_table.html')

# Start building the HTML table
html = '<table class="erf-table">\n'
html += '    <thead>\n'
html += '        <tr>\n'
html += '            <th class="base-col">\( \\boldsymbol{z} \\)</th>\n'  # Base x value column with border
for j in range(num_cols):  # 10 columns for second decimal increments (0.00 to 0.09)
    html += f'            <th>\\( \\boldsymbol{{0.{j:02d}}} \\)</th>\n'
html += '        </tr>\n'
html += '    </thead>\n'

# Body of the table
html += '    <tbody>\n'

for i in range(num_rows):
    html += '        <tr>\n'
    base_x = base_x_values[i]
    # First column: base x value (bold) with border
    html += f'            <td class="base-col">\( \\boldsymbol{{{base_x:.1f}}} \\)</td>\n'
    # Remaining columns: norm.cdf(x + 0.01 * j)
    for j in range(num_cols):
        x = base_x + j * 0.01
        cdf_value = norm.cdf(x)  # Standard normal CDF
        html += f'            <td>\\( {cdf_value:.5f} \\)</td>\n'
    html += '        </tr>\n'

html += '    </tbody>\n'
html += '</table>'

# Write the HTML to a file in the script's directory
with open(output_file, 'w') as f:
    f.write(html)

print(f"HTML table generated and saved as '{output_file}'")