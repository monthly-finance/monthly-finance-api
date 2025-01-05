import pandas as pd

def transform_month_to_column(dataframe, output_file):
    """
    Transforms a dataframe to have a 'MONTH' column by melting the monthly columns
    and saves the result to a CSV file.

    Args:
        dataframe (pd.DataFrame): Input dataframe with months as columns.
        output_file (str): Path to save the transformed DataFrame as a CSV.

    Returns:
        pd.DataFrame: Transformed dataframe with 'MONTH' as a column.
    """
    # Define month columns
    month_columns = [
        "JANUARY", "FEBUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ]
    
    # Melt the dataframe
    melted_df = pd.melt(
        dataframe,
        id_vars=["NAME", "YEAR", "CATEGORY", "SUB_CATEGORY"],  # Columns to keep
        value_vars=month_columns,  # Columns to unpivot
        var_name="MONTH",  # Name of the new column for months
        value_name="VALUE"  # Name of the new column for the values
    )
    
    # Save the transformed dataframe to a file
    melted_df.to_csv(output_file, index=False)
    
    return melted_df

# Example usage
# Assuming `df` is the input dataframe
df = pd.read_csv("personal-budget-spreadsheet.csv")
output_file = "transformed_finance_data.csv"
transformed_df = transform_month_to_column(df, output_file)

print(f"Transformed data saved to: {output_file}")
