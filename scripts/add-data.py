import pandas as pd
import requests

API_BASE_URL = "localhost:3000"
AUTH_TOKEN = ""
CSV_FILE_PATH = "./transformed_finance_data.csv"
# NAME,YEAR,CATEGORY,SUB_CATEGORY,MONTH,VALUE


def create_reports():
    """
    Process the CSV file to extract unique MONTH and YEAR combinations and send requests
    to create expense and income reports for each combination.
    """
    df = pd.read_csv(CSV_FILE_PATH)
    unique_combinations = df[["MONTH", "YEAR"]].drop_duplicates()

    headers = {
        "Authorization": f"Bearer {AUTH_TOKEN}",
        "Content-Type": "application/json",
    }

    for _, row in unique_combinations.iterrows():
        month, year = row["MONTH"], row["YEAR"]

        expense_payload = {"forMonth": month, "forYear": year}

        income_payload = {"forMonth": month, "forYear": year}

        expense_response = requests.post(
            f"{API_BASE_URL}/expense/expense-report",
            json=expense_payload,
            headers=headers,
        )
        if expense_response.status_code == 201:
            print(f"Expense report created for {month} {year}.")
        else:
            print(
                f"Failed to create expense report for {month} {year}: {expense_response.text}"
            )

        income_response = requests.post(
            f"{api_base_url}/income/income-report", json=income_payload, headers=headers
        )
        if income_response.status_code == 201:
            print(f"Income report created for {month} {year}.")
        else:
            print(
                f"Failed to create income report for {month} {year}: {income_response.text}"
            )


def insert_data():
    df = pd.read_csv(CSV_FILE_PATH)

    income = {
        "reportId": None,
        "employeeBenefit": [],
        "paycheck": [],
        "otherIncome": [],
    }

    expense = {
        "reportId": None,
        "utilities": [],
        "cardEndOfMonthStatement": [],
        "rent": [],
        "otherExpense": [],
    }

    for _, row in df.iterrows():
        # TODO: add reportId
        if row["CATEGORY"] == "EXPENSE" or row["SUB_CATEGORY"] == "BANK":

            if row["SUB_CATEGORY"] == "UTILITY":
                payload = {"amount": row["VALUE"], "type": row["NAME"]}
                expense["utilities"].append(payload)

            if row["SUB_CATEGORY"] == "RENT":
                payload = {"amount": row["VALUE"], "rentor": "MAA Peachtree Hills"}
                expense["rent"].append(payload)

            if row["SUB_CATEGORY"] == "CARD":
                # TODO: account type should be variable
                payload = {
                    "bankName": row["NAME"],
                    "accountType": "CREDIT",
                    "amount": row["VALUE"],
                    "isPayed": True,
                }
                expense["cardEndOfMonthStatement"].append(payload)

            if row["SUB_CATEGORY"] == "OTHER":
                # TODO: datePayed should be variable
                payload = {
                    "datePayed": "2024-02-10T10:07:58.767Z",
                    "type": row["NAME"],
                    "amount": row["VALUE"],
                }

    print(expense)


insert_data()
