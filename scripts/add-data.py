import json

import pandas as pd
import requests

API_BASE_URL = "http://localhost:3000"
AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MmUzZTQyNC02OTVjLTQ3MGMtYWFlZi03ZTIwZWM3YmMwMzIiLCJ1c2VybmFtZSI6InN1bm55RDEyMyIsInVzZXJJZCI6IjQyZTNlNDI0LTY5NWMtNDcwYy1hYWVmLTdlMjBlYzdiYzAzMiIsImlhdCI6MTczNjAzOTg3OSwiZXhwIjoxNzM2MTI2Mjc5fQ.5f8oGQXCX3d8dYun_qb3yDVQ4RQW1ZH-YHoi4fO6-uw"
OUTPUT_FILE_PATH = "./expense_output.json"
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
            print("Missing VALUE field. Exiting loop.")
            continue

        if not (row["CATEGORY"] == "EXPENSE" or row["CATEGORY"] == "BANK"):
            continue

        raw = requests.get(
            f"{API_BASE_URL}/expense/expense-report/{row['MONTH']}/{row['YEAR']}"
        )
        response_json = raw.json()
        expense["reportId"] = response_json.get("reportId")

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

    # with open(OUTPUT_FILE_PATH, "w") as outfile:
    #     json.dump(expense, outfile, indent=4)


def insert_ncome_data():
    df = pd.read_csv(CSV_FILE_PATH)
    income = {
        "reportId": None,
        "employeeBenefit": [],
        "paycheck": [],
        "otherIncome": [],
    }


insert_expense_data()
