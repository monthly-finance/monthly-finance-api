import json

import pandas as pd
import requests

API_BASE_URL = "http://localhost:3000"
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjZlODE3Ni1iNDgzLTQyMDgtOGQ0Yy1lOGNlMjQ2NWJjYjgiLCJ1c2VybmFtZSI6ImdpbGVzIiwidXNlcklkIjoiZmY2ZTgxNzYtYjQ4My00MjA4LThkNGMtZThjZTI0NjViY2I4IiwiaWF0IjoxNzM2NzIwNTY0LCJleHAiOjE3MzY4MDY5NjR9.KfIKHeBK3dZt6pssdVJ3CdSihINxPGzq52l5HH8v4bc"
OUTPUT_FILE_PATH = "./expense_output.json"
CSV_FILE_PATH = "./transformed_finance_data.csv"
# NAME,YEAR,CATEGORY,SUB_CATEGORY,MONTH,VALUE

headers = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json",
}


def create_reports():
    """
    Process the CSV file to extract unique MONTH and YEAR combinations and send requests
    to create expense and income reports for each combination.
    """
    df = pd.read_csv(CSV_FILE_PATH)
    unique_combinations = df[["MONTH", "YEAR"]].drop_duplicates()

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
            f"{API_BASE_URL}/income/income-report", json=income_payload, headers=headers
        )
        if income_response.status_code == 201:
            print(f"Income report created for {month} {year}.")
        else:
            print(
                f"Failed to create income report for {month} {year}: {income_response.text}"
            )


def insert_expense_data():
    df = pd.read_csv(CSV_FILE_PATH)

    expense = {
        "reportId": None,
        "utilities": [],
        "cardEndOfMonthStatement": [],
        "rent": [],
        "otherExpense": [],
    }

    for _, row in df.iterrows():
        if "VALUE" not in row or pd.isna(row["VALUE"]):
            print("Missing VALUE field. Skipping row.")
            continue

        if not (row["CATEGORY"] == "EXPENSE" or row["CATEGORY"] == "BANK"):
            continue

        raw = requests.get(
            f"{API_BASE_URL}/expense/expense-report/{row['MONTH']}/{row['YEAR']}",
            headers=headers,
        )
        response_json = raw.json()
        expense["reportId"] = response_json.get("id")

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
            expense["otherExpense"].append(payload)

        response = requests.post(
            f"{API_BASE_URL}/expense/expense-report/insert",
            json=expense,
            headers=headers,
        )
        if response.status_code == 201:
            print("Expense data inserted successfully.")
        else:
            print(f"Failed to insert expense data: {response.text}")


def insert_income_data():
    df = pd.read_csv(CSV_FILE_PATH)

    for _, row in df.iterrows():

        if "VALUE" not in row or pd.isna(row["VALUE"]):
            print("Missing VALUE field. Skipping row.")
            continue

        if row["CATEGORY"] != "INCOME":
            continue

        income = {
            "reportId": None,
            "employeeBenefit": [],
            "paycheck": [],
            "otherIncome": [],
        }

        raw = requests.get(
            f"{API_BASE_URL}/income/income-report/{row['MONTH']}/{row['YEAR']}",
            headers=headers,
        )
        response_json = raw.json()
        income["reportId"] = response_json.get("id")

        if row["SUB_CATEGORY"] == "EMPLOYEE_BENEFIT":
            payload = {
                "datePayed": "2024-02-10T10:07:58.767Z",  # TODO: Make variable
                "amount": row["VALUE"],
                "type": row["NAME"],
            }
            income["employeeBenefit"].append(payload)

        if row["SUB_CATEGORY"] == "WAGE":
            payload = {
                "datePayed": "2024-02-10T10:07:58.767Z",  # TODO: Make variable
                "amount": row["VALUE"],
            }
            income["paycheck"].append(payload)

        if row["SUB_CATEGORY"] == "OTHER":
            payload = {
                "datePayed": "2024-02-10T10:07:58.767Z",  # TODO: Make variable
                "type": row["NAME"],
                "amount": row["VALUE"],
            }
            income["otherIncome"].append(payload)
        print(income)
        response = requests.post(
            f"{API_BASE_URL}/income/income-report/insert", json=income, headers=headers
        )
        if response.status_code == 201:
            print("Income data inserted successfully.")
        else:
            print(f"Failed to insert income data: {response.text}")


# create_reports()
insert_expense_data()
# insert_income_data()
